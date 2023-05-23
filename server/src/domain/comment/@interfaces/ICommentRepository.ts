import { Comment } from "../Comment";

export interface ICommentRepository {
  create(comment: Comment): Promise<Comment>;
  update(updatedComment: Comment): Promise<Comment>;
  get(): Promise<Comment[]>;
  delete(commentId: string): Promise<Comment>;
  findById(commentId: string): Promise<Comment | undefined>;
  getByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;
}
