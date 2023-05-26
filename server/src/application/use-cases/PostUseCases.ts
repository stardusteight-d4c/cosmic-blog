import { IPostReflectObject, Post, PostService } from "@/domain/post";

export class PostUseCases {
  constructor(private postService: PostService) {}

  async create(post: IPostReflectObject): Promise<Post> {
    return await this.postService.createPost(post);
  }

  async update(updatedPost: IPostReflectObject): Promise<Post | undefined> {
    return await this.postService.updatePost(updatedPost);
  }

  async getById(postId: string): Promise<Post | undefined> {
    return await this.postService.getPostById(postId);
  }

  async getByTitle(title: string): Promise<Post | undefined> {
    return await this.postService.getPostByTitle(title);
  }

  async getWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    return await this.postService.getPostsByPagination({
      skip,
      pageSize,
    });
  }

  async getAll(): Promise<Post[]> {
    return await this.postService.getPosts();
  }
}
