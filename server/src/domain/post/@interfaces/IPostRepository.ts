import Post from "../Post";

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  deletePost(postId: string): Promise<Post | undefined>;
  findPostById(postId: string): Promise<Post | undefined>;
  toggleFavorite(updatedPost: Post): Promise<Post>;
}
