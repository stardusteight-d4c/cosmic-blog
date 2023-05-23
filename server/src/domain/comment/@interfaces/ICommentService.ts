import {
  Comment,
  CommentPostEvent,
  ICommentReflectObject,
} from "@/domain/comment";

export interface ICommentService {
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
  // getCommentsByPostIdWithPagination(postId: string): Promise<Comment | undefined>;
  // getCommentsByUserIdWithPagination(userId: string): Promise<Comment | undefined>;

  // emitDeleteCommentEvent

  // Event Emitters
  emitCreateCommentEvent(comment: ICommentReflectObject): Promise<Comment>;

  // Event Handlers
  handlerCommentPostEvent(
    event: CommentPostEvent,
  ): Promise<Comment | undefined>;
}
