import { IPostReflectObject, PostService } from "@/domain/post";

export default class PostUsesCases {
  constructor(private postService: PostService) {}

  async createPost(request: IPostReflectObject) {
    const post = await this.postService.createPost(request);
    return post;
  }
}
