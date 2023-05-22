import { Comment, ICommentReflectObject } from "@/domain/comment";

export interface ICommentService {
  createComment(comment: ICommentReflectObject): Promise<Comment>;
  deleteComment(commentId: string): Promise<Comment | undefined>;
  findCommentById(userId: string): Promise<Comment | undefined>;

  // emitCreateComment
  // emitDeleteComment
  // handlerCreateComment
}
