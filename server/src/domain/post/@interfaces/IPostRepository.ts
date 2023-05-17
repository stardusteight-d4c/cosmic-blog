import Post from "../Post";

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  deletePost(postId: string): Promise<Post | undefined>;
  updatePost(updatedPost: Post): Promise<Post>;
  findPostById(postId: string): Promise<Post | undefined>;
  findPostByTitle(postTitle: string): Promise<Post | undefined>;
  toggleFavorite(updatedPost: Post): Promise<Post>;
}
