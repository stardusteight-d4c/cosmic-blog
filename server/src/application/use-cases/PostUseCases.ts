import type { IPostReflectObject, IPostService } from "@typings/post";
import { Post } from "@domain/aggregates/post";
import { ISessionTokenAdapter, IUserTokenInfo } from "../adapters";

export class PostUseCases {
  constructor(readonly postService: IPostService) {}

  private async getPostResponse(request: {
    decoded: false | IUserTokenInfo;
    post: IPostReflectObject;
  }): Promise<IGetPostResponse> {
    const { decoded, post } = request;
    let isAuthor = false;
    let isGuest = true;
    let isFavorited = false;
    if (decoded) {
      isAuthor = decoded.user_id === post.author.id;
      isGuest = false;
      isFavorited = await this.postService.isPostFavoritedByUser({
        userId: decoded.user_id,
        postId: post.id,
      });
    }
    return {
      ...post,
      favoriteAmount: await this.postService.getPostFavoriteAmount(post.id),
      commentAmount: await this.postService.getPostCommentAmount(post.id),
      isAuthor,
      isGuest,
      isFavorited,
    } as IGetPostResponse;
  }

  async create(post: IPostReflectObject): Promise<Post> {
    return await this.postService.createPost(post);
  }

  async update(updatedPost: IPostReflectObject): Promise<Post | undefined> {
    return await this.postService.updatePost(updatedPost);
  }

  async delete(postId: string): Promise<void> {
    return await this.postService.deletePost(postId);
  }

  async getById(
    postId: string,
    validation: { sessionTokenAdapter: ISessionTokenAdapter; authToken: string }
  ): Promise<IGetPostResponse> {
    return this.postService.getPostById(postId).then(async (post) => {
      const sessionTokenAdapter = validation.sessionTokenAdapter;
      const decoded = sessionTokenAdapter.verifySessionToken(
        validation.authToken
      );
      return await this.getPostResponse({ decoded, post: post.reflect });
    });
  }

  async getBySlug(
    slug: string,
    validation: { sessionTokenAdapter: ISessionTokenAdapter; authToken: string }
  ): Promise<IGetPostResponse> {
    return this.postService.getPostBySlug(slug).then(async (post) => {
      const sessionTokenAdapter = validation.sessionTokenAdapter;
      const decoded = sessionTokenAdapter.verifySessionToken(
        validation.authToken
      );
      return await this.getPostResponse({ decoded, post: post.reflect });
    });
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
