import { IPostRepository, Post } from "../../domain/post";

export class PostInMemoryRepository implements IPostRepository {
  #posts: Map<string, Post> = new Map();

  public get posts() {
    throw new Error("Cannot access posts property directly.");
  }
  public set posts(_value: string) {
    throw new Error("Cannot modify posts property directly.");
  }

  private async replace(updatedPost: Post): Promise<Post> {
    const existingPost = await this.findById(updatedPost.reflect.id!);
    if (!existingPost) {
      throw new Error(`No post found with id: ${updatedPost.reflect.id}`);
    }
    this.#posts.delete(existingPost.reflect.id!);
    this.#posts.set(updatedPost.reflect.id!, updatedPost);
    return updatedPost;
  }

  public async create(post: Post): Promise<Post> {
    this.#posts.set(post.reflect.id!, post);
    return post;
  }

  public async update(updatedPost: Post): Promise<Post> {
    const post = await this.replace(updatedPost);
    return post;
  }

  public async delete(postId: string): Promise<Post> {
    const post = await this.findById(postId);
    this.#posts.delete(postId);
    return post!;
  }

  public async findById(postId: string): Promise<Post | undefined> {
    return this.#posts.get(postId);
  }

  public async findByTitle(postTitle: string): Promise<Post | undefined> {
    for (const post of this.#posts.values()) {
      if (post.reflect.title.includes(postTitle)) {
        return post;
      }
    }
    return undefined;
  }

  public async get(): Promise<Post[]> {
    const posts: Post[] = Array.from(this.#posts.values());
    return posts;
  }

  public async getByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const allPosts: Post[] = Array.from(this.#posts.values());
    const startIndex = Math.max(0, skip);
    const paginatedPosts = allPosts.slice(startIndex, startIndex + pageSize);
    return paginatedPosts;
  }
}
