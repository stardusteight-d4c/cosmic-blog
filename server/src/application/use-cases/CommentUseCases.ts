import { Comment } from "@domain/aggregates/comment";
import type { ICommentReflectObject, ICommentService } from "@typings/comment";
import Validators from "../helpers/Validators";
import { ISessionTokenAdapter } from "../adapters";

export class CommentUseCases {
  constructor(readonly commentService: ICommentService) {}

  private async paginationByUserId(request: {
    value: string;
    skip: number;
    pageSize: number;
  }) {
    return await this.commentService.getCommentsByUserIdWithPagination({
      userId: request.value,
      skip: request.skip,
      pageSize: request.pageSize,
    });
  }

  private async paginationByPostId(request: {
    value: string;
    skip: number;
    pageSize: number;
  }) {
    return await this.commentService.getCommentsByPostIdWithPagination({
      postId: request.value,
      skip: request.skip,
      pageSize: request.pageSize,
    });
  }

  private async getPostAmount(postId: string) {
    return await this.commentService.getPostCommentAmount(postId);
  }

  private async getUserAmount(userId: string) {
    return await this.commentService.getUserCommentAmount(userId);
  }

  public async create(
    comment: ICommentReflectObject,
    validation: {
      sessionTokenAdapter: ISessionTokenAdapter;
      authToken: string;
      userId: string;
    }
  ) {
    Validators.isSameUser(validation);
    return await this.commentService.createComment(comment);
  }

  public async delete(
    commentId: string,
    validation: {
      sessionTokenAdapter: ISessionTokenAdapter;
      authToken: string;
      userId: string;
    }
  ) {
    Validators.isSameUser(validation);
    return await this.commentService.deleteComment(commentId);
  }

  public async edit(
    updatedComment: ICommentReflectObject,
    validation: {
      sessionTokenAdapter: ISessionTokenAdapter;
      authToken: string;
      userId: string;
    }
  ) {
    Validators.isSameUser(validation);
    return await this.commentService.updateComment(updatedComment);
  }

  public async getAmount(request: { of: "post" | "user"; id: string }) {
    const call = request.of === "post" ? "getPostAmount" : "getUserAmount";
    return await this[call](request.id);
  }

  public async getWithPagination(request: {
    by: "userId" | "postId";
    value: string;
    skip: number;
    pageSize: number;
  }) {
    const call =
      request.by === "postId" ? "paginationByPostId" : "paginationByUserId";
    return (await this[call]({
      value: request.value,
      skip: request.skip,
      pageSize: request.pageSize,
    })) as Comment[];
  }
}
