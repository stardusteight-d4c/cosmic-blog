import { Post } from "@domain/src/post";
import { IUserReflectObject } from "./user";

export interface IPostReflectObject {
  id?: string;
  title?: string;
  slug?: string;
  body?: string;
  tags?: string[];
  coverImage?: string;
  postedAt?: Date;
  lastChange?: Date;
  author?: AuthorMetadata;
}

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  updatePost(post: IPostReflectObject): Promise<Post>;
  deletePost(id: string): Promise<void>;
  getPostById(id: string): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostsByTitle(title: string): Promise<Post[] | undefined>;
  getPosts(): Promise<Post[]>;
  getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]>;
  getUserFavoritePostsByPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]>;
}

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  update(updatedPost: Post, existingPost: Post): Promise<Post>;
  delete(id: string): Promise<Post | undefined>;
  deleteAll(): Promise<void>;
  findById(id: string): Promise<Post | undefined>;
  findBySlug(slug: string): Promise<Post | undefined>;
  findManyByTitle(title: string, limit: number): Promise<Post[] | undefined>;
  findAll(): Promise<Post[]>;
  findWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]>;
  findByIds(ids: string[]): Promise<Post[]>;
  findPostTitleById(id: string): Promise<string>;
}

export type AuthorMetadata = {
  id: string;
  email: string;
  username: string;
  avatar: string;
  userRole: TUserRole;
};

