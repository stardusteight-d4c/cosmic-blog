import { ICommentReflectObject } from "./@interfaces/ICommentReflectObject";
import { ICommentService } from "./@interfaces/ICommentService";
import { Comment } from "./Comment";

export class CommentService implements ICommentService {
  createComment(comment: ICommentReflectObject): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  deleteComment(commentId: string): Promise<Comment | undefined> {
    throw new Error("Method not implemented.");
  }
  findCommentById(userId: string): Promise<Comment | undefined> {
    throw new Error("Method not implemented.");
  }
}