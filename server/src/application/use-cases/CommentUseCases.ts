import { Comment } from "@domain/aggregates/comment";
import type { ICommentReflectObject, ICommentService } from "@typings/comment";
import Validators from "../helpers/Validators";
import { ISessionTokenAdapter } from "../adapters";

export class CommentUseCases {
  constructor(private commentService: ICommentService) {}

  private async paginationByUserId(request: ICommentPaginationByParams) {
    return await this.commentService.getCommentsByUserIdWithPagination({
      userId: request.value,
      skip: request.skip,
      pageSize: request.pageSize,
    });
  }

  private async paginationByPostId(request: ICommentPaginationByParams) {
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

  public async getAmount(request: IGetCommentAmountRequest) {
    const call =
      request.of === "post" ? this.getPostAmount : this.getUserAmount;
    return await call(request.id);
  }

  public async getWithPagination(request: IGetCommentWithPaginationRequest) {
    const call =
      request.by === "postId"
        ? this.paginationByPostId
        : this.paginationByUserId;
    return (await call({
      value: request.value,
      skip: request.skip,
      pageSize: request.pageSize,
    })) as Comment[];
  }
}
