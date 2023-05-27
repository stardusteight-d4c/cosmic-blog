import {
  Comment,
  ICommentReflectObject,
  ICommentService,
} from "@domain/src/comment";

export class CommentUseCases {
  constructor(private commentService: ICommentService) {}

  async create(comment: ICommentReflectObject) {
    return await this.commentService.createComment(comment);
  }

  async delete(comment: Comment) {
    return await this.commentService.deleteComment(comment);
  }

  async edit(updatedComment: ICommentReflectObject) {
    return await this.commentService.updateComment(updatedComment);
  }

  async getWithPagination(request: {
    by: "userId" | "postId";
    info: string;
    skip: number;
    pageSize: number;
  }) {
    const { by, info, skip, pageSize } = request;
    if (by === "postId") {
      return await this.commentService.getCommentsByPostIdWithPagination({
        postId: info,
        skip,
        pageSize,
      });
    } else if (by === "userId") {
      return await this.commentService.getCommentsByUserIdWithPagination({
        userId: info,
        skip,
        pageSize,
      });
    }
  }

  async getPostAmount(postId: string) {
    return await this.commentService.getPostCommentAmount(postId);
  }

  async getUserAmount(userId: string) {
    return await this.commentService.getUserCommentAmount(userId);
  }
}
