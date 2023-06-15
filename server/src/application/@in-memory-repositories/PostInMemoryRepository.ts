import type { IPostReflectObject, IPostRepository } from "@typings/post";
import { Post } from "@domain/src/post";

export class PostInMemoryRepository implements IPostRepository {
  private static instance: PostInMemoryRepository;
  #posts: Map<string, Post> = new Map();

  private constructor() {}

  private deleteUndefinedFields(copyUpdate: IPostReflectObject): void {
    const fieldsToDelete = [
      "title",
      "slug",
      "body",
      "tags",
      "coverImage",
      "postedAt",
      "lastChange",
      "author",
    ];
    for (const field of fieldsToDelete) {
      if (copyUpdate[field] === undefined) {
        delete copyUpdate[field];
      }
    }
  }

  private async replace(updatedPost: Post, existingPost: Post): Promise<Post> {
    const copyUpdate = updatedPost.reflect;
    this.deleteUndefinedFields(copyUpdate);
    const updatedPostObj = { ...existingPost.reflect, ...copyUpdate };
    const newPost = new Post({ ...updatedPostObj });
    this.#posts.delete(existingPost.reflect.id!);
    this.#posts.set(newPost.reflect.id!, newPost);
    return newPost;
  }

  public static getInstance(): PostInMemoryRepository {
    if (!PostInMemoryRepository.instance) {
      PostInMemoryRepository.instance = new PostInMemoryRepository();
    }
    return PostInMemoryRepository.instance;
  }

  public async create(post: Post): Promise<Post> {
    this.#posts.set(post.reflect.id!, post);
    this.#posts.set(post.reflect.slug, post);
    return post;
  }

  public async update(updatedPost: Post, existingPost: Post): Promise<Post> {
    const post = await this.replace(updatedPost, existingPost);
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
    return this.#posts.get(postId);
  }

  public async findBySlug(slug: string): Promise<Post | undefined> {
    return this.#posts.get(slug);
  }

  public async findManyByTitle(postTitle: string): Promise<Post[]> {
    const normalizedPostTitle = postTitle.toLowerCase();
    const postsArray = Array.from(this.#posts.values());
    const filteredPosts = postsArray.filter((post) => {
      const normalizedPost = post.reflect.title.toLowerCase();
      return normalizedPost.includes(normalizedPostTitle);
    });
    const limitedPosts = filteredPosts.slice(0, 6);
    return limitedPosts;
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
