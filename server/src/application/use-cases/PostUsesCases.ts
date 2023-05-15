import { IPostReflectObject, Post, PostService } from "@/domain/post";

export default class PostUsesCases {
  constructor(private postService: PostService) {}

  async createPost(request: IPostReflectObject): Promise<Post> {
    const post = await this.postService.createPost(request);
    return post;
  }
  async favoritePost(request: { userId: string; postId: string }): Promise<Post> {
    const favoritedPost = await this.postService.publishFavoritePostCommand(request.userId, request.postId);
    return favoritedPost!
  }
}
