import type { IPostReflectObject, IPostService } from "@typings/post";
import type { ISessionTokenAdapter, IUserTokenInfo } from "../adapters";
import { Post } from "@domain/aggregates/post";
import Validators from "../helpers/Validators";

export class PostUseCases {
  constructor(readonly postService: IPostService) {}

  private async buildPostResponse(request: {
    decoded: false | IUserTokenInfo;
    post: IPostReflectObject;
  }): Promise<IGetPostResponse> {
    return Validators.requestedClientInformation({
      decoded: request.decoded,
      post: request.post,
      service: this.postService,
    }).then((infos) => {
      return {
        ...request.post,
        ...infos,
      } as IGetPostResponse;
    });
  }

  public async create(post: IPostReflectObject): Promise<Post> {
    return await this.postService.createPost(post);
  }

  public async update(
    updatedPost: IPostReflectObject
  ): Promise<Post | undefined> {
    return await this.postService.updatePost(updatedPost);
  }

  public async delete(postId: string): Promise<void> {
    return await this.postService.deletePost(postId);
  }

  public async getById(
    postId: string,
    validation: { sessionTokenAdapter: ISessionTokenAdapter; authToken: string }
  ): Promise<IGetPostResponse> {
    return this.postService.getPostById(postId).then(async (post) => {
      const sessionTokenAdapter = validation.sessionTokenAdapter;
      return await this.buildPostResponse({
        decoded: sessionTokenAdapter.verifySessionToken(validation.authToken),
        post: post.reflect,
      });
    });
  }

  public async getBySlug(
    slug: string,
    validation: { sessionTokenAdapter: ISessionTokenAdapter; authToken: string }
  ): Promise<IGetPostResponse> {
    return this.postService.getPostBySlug(slug).then(async (post) => {
      const sessionTokenAdapter = validation.sessionTokenAdapter;
      const decoded = sessionTokenAdapter.verifySessionToken(
        validation.authToken
      );
      return await this.buildPostResponse({ decoded, post: post.reflect });
    });
  }

  public async getManyByTitle(title: string): Promise<Post[]> {
    return await this.postService.getPostsByTitle(title);
  }

  public async getWithPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return await this.postService.getPostsByPagination(request);
  }

  public async getAll(): Promise<Post[]> {
    return await this.postService.getPosts();
  }

  public async getUserFavoritePostsWithPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return await this.postService.getUserFavoritePostsByPagination(request);
  }

  public async getPostsByTag(request: {
    tag: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return await this.postService.getFilteringPostsByTag(request);
  }
}
