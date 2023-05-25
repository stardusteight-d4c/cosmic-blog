import {
  Comment,
  ICommentReflectObject,
} from "@/domain/comment";

export interface ICommentService {
  emitCreateCommentEvent(comment: ICommentReflectObject): Promise<Comment>;
  findCommentById(commentId: string): Promise<Comment | undefined>;
  updateComment(
    updatedComment: ICommentReflectObject,
  ): Promise<Comment | undefined>;
  getComments(): Promise<Comment[] | undefined>;
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
  emitDeleteCommentEvent(comment: Comment): Promise<void>;
}
