import { Post } from "..";
import { IPostReflectObject } from "./IPostReflectObject";

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  updatePost(post: IPostReflectObject): Promise<Post>;
  deletePost(postId: string): Promise<void>;
  getPostById(postId: string): Promise<Post | undefined>;
  getPostByTitle(postTitle: string): Promise<Post | undefined>;
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
