import { IPostRepository, Post } from "../entities/Post";

export class InMemoryPostRepository implements IPostRepository {
  #posts: Map<string, Post> = new Map();

  public get posts() {
    throw new Error("Cannot access posts property directly.");
  }
  public set posts(_value: string) {
    throw new Error("Cannot modify posts property directly.");
  }

  private async replacePost(updatedPost: Post): Promise<Post> {
    const existingPost = await this.findPostById(updatedPost.reflect.id!);
    if (!existingPost) {
      throw new Error(`No user found with id: ${updatedPost.reflect.id}`);
    }
    this.#posts.delete(existingPost.reflect.id!);
    this.#posts.set(updatedPost.reflect.id!, updatedPost);
    return updatedPost;
  }

  public async createPost(post: Post): Promise<Post> {
    this.#posts.set(post.reflect.id!, post);
    return post;
  }

  public async deletePost(postId: string): Promise<Post> {
    const post = await this.findPostById(postId);
    this.#posts.delete(postId);
    return post!;
  }

  public async findPostById(postId: string): Promise<Post | undefined> {
    return this.#posts.get(postId);
  }
}
