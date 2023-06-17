import { Comment } from "@domain/src/comment";
import { IUserReflectObject } from "./user";
import { CommentHandler } from "@/domain/src/comment/CommentHandler";

export interface ICommentReflectObject {
  id?: string;
  post?: PostMetadata;
  owner?: OwnerMetadata;
  content?: string;
  postedAt?: Date;
}

export interface ICommentService {
  createComment(comment: ICommentReflectObject): Promise<Comment>;
  updateComment(updatedComment: ICommentReflectObject): Promise<Comment>;
  deleteComment(commentId: string): Promise<void>;
  deleteAllCommentsByPostId(postId: string): Promise<void>;
  deleteAllCommentsByUserId(userId: string): Promise<void>;
  getCommentById(commentId: string): Promise<Comment | undefined>;
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

export interface ICommentRepository {
  create(comment: Comment): Promise<Comment>;
  update(updatedComment: Comment, existingComment: Comment): Promise<Comment>;
  delete(commentId: string): Promise<void>;
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

export type PostMetadata = {
  id: string;
  title: string;
  slug: string;
};

export type OwnerMetadata = {
  id: string;
  username: string;
  avatar: string;
};
