import { Post } from "..";
import { ICommentService } from "@/domain/comment";
import { IPostReflectObject } from "./IPostReflectObject";

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  updatePost(post: IPostReflectObject): Promise<Post>;
  deletePost(postId: string): Promise<void>;
  findPostById(postId: string): Promise<Post | undefined>;
  findPostByTitle(postTitle: string): Promise<Post | undefined>;
  getPosts(): Promise<Post[]>;
  getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]>;
}
