import type { IPostReflectObject, IPostService } from "@typings/post";
import { Post } from "@domain/aggregates/post";

export class PostUseCases {
  constructor(private postService: IPostService) {}

  async create(post: IPostReflectObject): Promise<Post> {
    return await this.postService.createPost(post);
  }

  async update(updatedPost: IPostReflectObject): Promise<Post | undefined> {
    return await this.postService.updatePost(updatedPost);
  }

  async delete(postId: string): Promise<void> {
    return await this.postService.deletePost(postId);
  }

  async getById(postId: string): Promise<Post | undefined> {
    return await this.postService.getPostById(postId);
  }

  async getBySlug(slug: string): Promise<Post | undefined> {
    return await this.postService.getPostBySlug(slug);
  }

  async getManyByTitle(title: string): Promise<Post[]> {
    return await this.postService.getPostsByTitle(title);
  }

  async getWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return await this.postService.getPostsByPagination(request);
  }

  async getAll(): Promise<Post[]> {
    return await this.postService.getPosts();
  }

  async getUserFavoritePostsWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return await this.postService.getUserFavoritePostsByPagination(request);
  }
}
