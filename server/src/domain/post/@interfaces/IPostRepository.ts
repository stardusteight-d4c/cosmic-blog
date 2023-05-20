import { Post } from "../Post";

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  updatePost(updatedPost: Post): Promise<Post>;
  deletePost(postId: string): Promise<Post | undefined>;
  findPostById(postId: string): Promise<Post | undefined>;
  findPostByTitle(postTitle: string): Promise<Post | undefined>;
}
