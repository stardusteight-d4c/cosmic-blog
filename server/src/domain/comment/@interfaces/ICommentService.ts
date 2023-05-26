import { Comment, ICommentReflectObject } from "@/domain/comment";

export interface ICommentService {
  createComment(comment: ICommentReflectObject): Promise<Comment>;
  deleteComment(comment: Comment): Promise<void>;
  deleteCommentsByPostId(postId: string): Promise<void>;
  findCommentById(commentId: string): Promise<Comment | undefined>;
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
