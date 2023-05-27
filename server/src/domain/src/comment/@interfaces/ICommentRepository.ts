import { Comment } from "../Comment";

export interface ICommentRepository {
  create(comment: Comment): Promise<Comment>;
  update(updatedComment: Comment): Promise<Comment>;
  delete(commentId: string): Promise<Comment>;
  deleteAll(): Promise<void>;
  deleteAllByPostId(postId: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
  findAll(): Promise<Comment[]>;
  findById(commentId: string): Promise<Comment | undefined>;
  findAllByPostId(postId: string): Promise<Comment[]>;
  findAllByUserId(userId: string): Promise<Comment[]>;
  findByPostIdWithPagination(request: {
    postId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;
  findByUserIdWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Comment[]>;
}
