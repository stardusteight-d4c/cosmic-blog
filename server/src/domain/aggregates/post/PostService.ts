import type {
  IPostReflectObject,
  IPostRepository,
  IPostService,
} from "@typings/post";
import { Publisher } from "@domain/Publisher";
import { Post, postBuilderFactory } from ".";
import { PostHandler } from "./PostHandler";
import { Favorite } from "../favorite";

export class PostService implements IPostService {
  #handler: PostHandler;

  constructor(readonly postRepository: IPostRepository) {
    const publisher = Publisher.getInstance();
    this.#handler = new PostHandler({ postRepository, publisher });
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    return this.#handler
      .findUserIdOrThrowError(post.author.id)
      .then(async () => {
        const postInstance = postBuilderFactory(post);
        await this.#handler.findSlugAndThrowError(postInstance.reflect.slug);
        return this.postRepository.create(postInstance).then((post) => post);
      });
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    return this.#handler
      .findPostIdOrThrowError(post.id)
      .then(async (existingPost) => {
        return await this.postRepository.update(new Post(post), existingPost);
      });
  }

  public async deletePost(postId: string): Promise<void> {
    return this.postRepository
      .delete(postId)
      .then(async () => await this.#handler.publishDeletePost(postId));
  }

  public async getPostById(postId: string): Promise<Post | undefined> {
    return await this.postRepository.findById(postId);
  }

  public async getPostBySlug(slug: string): Promise<Post | undefined> {
    return await this.postRepository.findBySlug(slug);
  }

  public async getPostsByTitle(title: string): Promise<Post[]> {
    return await this.postRepository.findManyByTitle(title, 6);
  }

  public async getPosts(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return await this.postRepository.findWithPagination(request);
  }

  public async getUserFavoritePostsByPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { userId, skip, pageSize } = request;
    return this.#handler
      .getAllUserFavoritedPosts(userId)
      .then(async (favoritedPosts) =>
        favoritedPosts.slice(Number(skip), Number(skip) + Number(pageSize))
      );
  }

  public async getPostFavoriteAmount(postId: string): Promise<number> {
    return await this.#handler.getFavoriteAmount(postId);
  }

  public async getPostCommentAmount(postId: string): Promise<number> {
    return await this.#handler.getCommentAmount(postId);
  }

  public async isPostFavoritedByUser(request: {
    postId: string;
    userId: string;
  }): Promise<boolean> {
    return await this.#handler
      .findPostFavorite(new Favorite(request))
      .then((favorite) => (favorite ? true : false));
  }

  public async getFilteringPostsByTag(request: {
    tag: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    return await this.postRepository.findPostsByTag(request);
  }
}
