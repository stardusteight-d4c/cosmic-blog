import { Post } from "../Post";

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  update(updatedPost: Post): Promise<Post>;
  delete(postId: string): Promise<Post | undefined>;
  findById(postId: string): Promise<Post | undefined>;
  findByTitle(postTitle: string): Promise<Post | undefined>;
  get(): Promise<Post[]>;
}
