import {
  Comment,
  CreateCommentEvent,
  DeleteCommentEvent,
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
  getCommentsByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;

  // TESTAR emitDeleteCommentEvent
  
  // Event Emitters
  emitCreateCommentEvent(comment: ICommentReflectObject): Promise<Comment>;
  emitDeleteCommentEvent(comment: Comment): Promise<void>;
  // Event Handlers
  handlerCreateCommentEvent(
    event: CreateCommentEvent,
  ): Promise<Comment | undefined>;
  handlerDeleteCommentEvent(event: DeleteCommentEvent): Promise<void>;
}
