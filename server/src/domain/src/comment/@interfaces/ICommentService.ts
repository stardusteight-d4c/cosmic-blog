import { Comment, ICommentReflectObject } from "@domain/src/comment";

export interface ICommentService {
  createComment(comment: ICommentReflectObject): Promise<Comment>;
  deleteComment(commentId: string): Promise<void>;
  deleteAllCommentsByPostId(postId: string): Promise<void>;
  deleteAllCommentsByUserId(userId: string): Promise<void>;
  getCommentById(commentId: string): Promise<Comment | undefined>;
  updateComment(
    updatedComment: ICommentReflectObject,
  ): Promise<Comment | undefined>;
  getAllComments(): Promise<Comment[] | undefined>;
  getCommentsByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;
  getCommentsByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;
  getPostCommentAmount(postId: string): Promise<number>;
  getUserCommentAmount(userId: string): Promise<number>;
}
