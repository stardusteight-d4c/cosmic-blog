import { Comment } from "@domain/src/comment";

export interface ICommentReflectObject {
  id?: string;
  postId: string;
  postTitle: string;
  owner: IUserReflectObject;
  content: string;
  postedAt: Date;
}

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

export interface ICommentService {
  createComment(comment: ICommentReflectObject): Promise<Comment>;
  deleteComment(commentId: string): Promise<void>;
  deleteAllCommentsByPostId(postId: string): Promise<void>;
  deleteAllCommentsByUserId(userId: string): Promise<void>;
  getCommentById(commentId: string): Promise<Comment | undefined>;
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
