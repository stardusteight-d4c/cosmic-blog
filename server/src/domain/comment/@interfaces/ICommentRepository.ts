import { Comment } from "../Comment";

export interface ICommentRepository {
  create(comment: Comment): Promise<Comment>;
  update(updatedComment: Comment): Promise<Comment>;
  getAll(): Promise<Comment[]>;
  delete(commentId: string): Promise<Comment>;
  deleteAll(): Promise<void>;
  deleteAllByPostId(postId: string): Promise<void>;
  findById(commentId: string): Promise<Comment | undefined>;
  getByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;
  getByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;
  findAllByPostId(postId: string): Promise<Comment[]>;
  findAllByUserId(userId: string): Promise<Comment[]>;
}
