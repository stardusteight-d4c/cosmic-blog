import { Post } from "@domain/src/post";

export interface IPostReflectObject {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedIn: Date;
  lastChange?: Date;
  author: IUserReflectObject;
}

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  update(updatedPost: Post): Promise<Post>;
  delete(postId: string): Promise<Post | undefined>;
  deleteAll(): Promise<void>;
  findById(postId: string): Promise<Post | undefined>;
  findManyByTitle(postTitle: string): Promise<Post[] | undefined>;
  findAll(): Promise<Post[]>;
  findWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]>;
  findByIds(postIds: string[]): Promise<Post[]>;
  findPostTitleById(postId: string): Promise<string>;
}

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  updatePost(post: IPostReflectObject): Promise<Post>;
  deletePost(postId: string): Promise<void>;
  getPostById(postId: string): Promise<Post | undefined>;
  getPostsByTitle(postTitle: string): Promise<Post[] | undefined>;
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
