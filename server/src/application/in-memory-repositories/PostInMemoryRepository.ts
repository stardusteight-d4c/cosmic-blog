import type { IPostReflectObject, IPostRepository } from "@typings/post";
import { Post } from "@domain/aggregates/post";

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

  private normalizeTitle(title: string): string {
    return title.toLowerCase();
  }

  private async filterPostsByTitle(
    title: string,
    limit: number
  ): Promise<Post[]> {
    const normalizedTitle = this.normalizeTitle(title);
    const postsArray = Array.from(this.#posts.values());
    const filteredPosts = postsArray.filter((post) => {
      const normalizedPost = this.normalizeTitle(post.reflect.title);
      return normalizedPost.includes(normalizedTitle);
    });
    const limitedPosts = filteredPosts.slice(0, limit);
    return limitedPosts;
  }

  private sortByPostAtDesc(a: Post, b: Post): number {
    const dateA = a.reflect.postedAt.getTime();
    const dateB = b.reflect.postedAt.getTime();
    return dateB - dateA;
  }

  private createUpdatedPostObject(
    updatedPost: IPostReflectObject,
    existingPost: IPostReflectObject
  ): IPostReflectObject {
    const copyUpdate = { ...updatedPost };
    this.deleteUndefinedFields(copyUpdate);
    return { ...existingPost, ...copyUpdate };
  }

  private updatePostInMap(postId: string, updatedPost: Post): void {
    this.#posts.delete(postId);
    this.#posts.set(updatedPost.reflect.id, updatedPost);
  }

  private async replace(updatedPost: Post, existingPost: Post): Promise<Post> {
    const updatedPostObj = this.createUpdatedPostObject(
      updatedPost.reflect,
      existingPost.reflect
    );
    this.updatePostInMap(existingPost.reflect.id, new Post(updatedPostObj));
    return new Post(updatedPostObj);
  }

  public static getInstance(): PostInMemoryRepository {
    if (!PostInMemoryRepository.instance) {
      PostInMemoryRepository.instance = new PostInMemoryRepository();
    }
    return PostInMemoryRepository.instance;
  }

  public async create(post: Post): Promise<Post> {
    this.#posts.set(post.reflect.id, post);
    return post;
  }

  public async update(updatedPost: Post, existingPost: Post): Promise<Post> {
    return await this.replace(updatedPost, existingPost);
  }

  public async delete(id: string): Promise<void> {
    this.#posts.delete(id);
  }

  public async deleteAll(): Promise<void> {
    return this.#posts.clear();
  }

  public async findById(id: string): Promise<Post | undefined> {
    return this.#posts.get(id);
  }

  public async findBySlug(slug: string): Promise<Post | undefined> {
    return Array.from(this.#posts.values()).find(
      (post) => post.reflect.slug === slug
    );
  }

  public async findManyByTitle(title: string, limit: number): Promise<Post[]> {
    return await this.filterPostsByTitle(title, limit);
  }

  public async findAll(): Promise<Post[]> {
    const posts: Post[] = Array.from(this.#posts.values());
    return posts.sort(this.sortByPostAtDesc);
  }

  public async findWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const allPosts = await this.findAll();
    return allPosts.slice(Number(skip), Number(pageSize) + Number(skip));
  }

  public async findByIds(ids: string[]): Promise<Post[]> {
    const posts: Post[] = [];
    for (const postId of ids) {
      const post = this.#posts.get(postId);
      if (post) {
        posts.push(post);
      }
    }
    return posts;
  }

  public async findPostTitleById(id: string): Promise<string> {
    const post = this.#posts.get(id);
    if (post) {
      return post.reflect.title;
    }
  }

  public async findPostsByTag(request: {
    tag: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const posts = Array.from(this.#posts.values());
    const filteredPosts = posts.filter((post) =>
      post.reflect.tags.includes(request.tag)
    );
    const sortedPosts = filteredPosts.sort(
      (a, b) => b.reflect.postedAt.getTime() - a.reflect.postedAt.getTime()
    );
    const paginatedPosts = sortedPosts.slice(
      Number(request.skip),
      Number(request.skip) + Number(request.pageSize)
    );
    return paginatedPosts;
  }

  public get posts() {
    throw new Error("Cannot access posts property directly.");
  }
  public set posts(_value: string) {
    throw new Error("Cannot modify posts property directly.");
  }
}
