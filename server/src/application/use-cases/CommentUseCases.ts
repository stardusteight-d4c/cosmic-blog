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

  async delete(commentId: string) {
    return await this.commentService.deleteComment(commentId);
  }

  async edit(updatedComment: ICommentReflectObject) {
    return await this.commentService.updateComment(updatedComment);
  }

  async getWithPagination(request: {
    by: "userId" | "postId";
    equals: string;
    skip: number;
    pageSize: number;
  }) {
    const { by, equals, skip, pageSize } = request;
    if (by === "postId") {
      return await this.commentService.getCommentsByPostIdWithPagination({
        postId: equals,
        skip,
        pageSize,
      });
    } else if (by === "userId") {
      return await this.commentService.getCommentsByUserIdWithPagination({
        userId: equals,
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
