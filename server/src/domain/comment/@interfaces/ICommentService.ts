import {
  Comment,
  CommentPostEvent,
  ICommentReflectObject,
} from "@/domain/comment";

export interface ICommentService {
  deleteComment(commentId: string): Promise<Comment | undefined>;
  findCommentById(userId: string): Promise<Comment | undefined>;
  // findCommentByPostId(userId: string): Promise<Comment | undefined>;

  // emitDeleteCommentEvent

  // Event Emitters
  emitCreateCommentEvent(comment: ICommentReflectObject): Promise<Comment>;

  // Event Handlers
  handlerCommentPostEvent(
    event: CommentPostEvent,
  ): Promise<Comment | undefined>;
}
