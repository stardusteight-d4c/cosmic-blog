import { IPostReflectObject, Post, PostService } from "@/domain/post";

export class PostUseCases {
  constructor(private postService: PostService) {}

  async createPost(request: IPostReflectObject): Promise<Post> {
    const post = await this.postService.createPost(request);
    return post;
  }

  async findPostById(request: string): Promise<Post | undefined> {
    const post = await this.postService.findPostById(request);
    return post;
  }

  async toggleFavoritePost(request: {
    userId: string;
    postId: string;
  }): Promise<Post | undefined> {
    const favoritedPost = await this.postService.emitFavoritePostEvent(
      request.userId,
      request.postId,
    );
    return favoritedPost;
  }
}
