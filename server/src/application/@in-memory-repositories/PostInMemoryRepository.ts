import { IPostRepository, Post } from "@domain/src/post";

export class PostInMemoryRepository implements IPostRepository {
  private static instance: PostInMemoryRepository;
  #posts: Map<string, Post> = new Map();

  private constructor() {}

  private async replace(updatedPost: Post): Promise<Post> {
    const existingPost = await this.findById(updatedPost.reflect.id!);
    if (!existingPost) {
      throw new Error(`No post found with id: ${updatedPost.reflect.id}`);
    }
    this.#posts.delete(existingPost.reflect.id!);
    this.#posts.set(updatedPost.reflect.id!, updatedPost);
    return updatedPost;
  }

  public static getInstance(): PostInMemoryRepository {
    if (!PostInMemoryRepository.instance) {
      PostInMemoryRepository.instance = new PostInMemoryRepository();
    }
    return PostInMemoryRepository.instance;
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

  public async deleteAll(): Promise<void> {
    this.#posts.clear();
  }

  public async findById(postId: string): Promise<Post | undefined> {
    const post = this.#posts.get(postId);
    if (!post) {
      throw new Error(`No post found with id: ${postId}`);
    }
    return post;
  }

  public async findByTitle(postTitle: string): Promise<Post | undefined> {
    for (const post of this.#posts.values()) {
      if (
        post.reflect.title
          .toLocaleLowerCase()
          .includes(postTitle.toLocaleLowerCase())
      ) {
        return post;
      }
    }
    return undefined;
  }

  public async findAll(): Promise<Post[]> {
    const posts: Post[] = Array.from(this.#posts.values());
    return posts;
  }

  public async findWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const allPosts: Post[] = Array.from(this.#posts.values());
    const paginatedPosts = allPosts
      .reverse()
      .slice(Number(skip), Number(pageSize) + Number(skip));
    return paginatedPosts;
  }

  public async findByIds(postIds: string[]): Promise<Post[]> {
    const posts: Post[] = [];
    for (const postId of postIds) {
      const post = this.#posts.get(postId);
      if (post) {
        posts.push(post);
      }
    }
    return posts;
  }

  public async findPostTitleById(postId: string): Promise<string> {
    const post = this.#posts.get(postId);
    if (post) {
      return post.reflect.title;
    } else {
      throw new Error(`Post not found for ID: ${postId}`);
    }
  }

  public get posts() {
    throw new Error("Cannot access posts property directly.");
  }
  public set posts(_value: string) {
    throw new Error("Cannot modify posts property directly.");
  }
}
