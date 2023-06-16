import type {
  IPostReflectObject,
  IPostRepository,
  IPostService,
} from "@typings/post";
import { Post, postBuilderFactory } from ".";
import DeletePostCommand from "./PostCommands";
import { IUserRepository } from "@/@typings/user";
import { IFavoriteRepository } from "@/@typings/favorite";
import ServiceHandlers from "./helpers/ServiceHandlers";
let i = 0;

export class PostService implements IPostService {
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;
  #favoriteRepository: IFavoriteRepository;
  #publisher?: IPublisher;

  constructor(implementations: {
    postRepository: IPostRepository;
    userRepository: IUserRepository;
    favoriteRepository: IFavoriteRepository;
    publisher?: IPublisher;
  }) {
    this.#postRepository = implementations.postRepository;
    this.#userRepository = implementations.userRepository;
    this.#favoriteRepository = implementations.favoriteRepository;
    if (implementations.publisher) {
      this.#publisher = implementations.publisher;
    }
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    await ServiceHandlers.findUserIdOrThrowError({
      userRepository: this.#userRepository,
      id: post.author.id,
    });
    const postInstance = postBuilderFactory({ post });
    await ServiceHandlers.findSlugAndThrowError({
      postRepository: this.#postRepository,
      slug: postInstance.reflect.slug,
    });
    return await this.#postRepository.create(postInstance);
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    const existingPost = await ServiceHandlers.findPostIdOrThrowError({
      postRepository: this.#postRepository,
      id: post.id,
    });
    return this.#postRepository
      .update(new Post(post), existingPost)
      .then((post) => post);
  }

  public async deletePost(id: string): Promise<void> {
    await this.#postRepository.delete(id);
    if (this.#publisher) {
      const deletePostCommand = new DeletePostCommand(id);
      await this.#publisher.emit(deletePostCommand);
    }
  }

  public async getPostById(id: string): Promise<Post | undefined> {
    return this.#postRepository.findById(id).then((post) => post);
  }

  public async getPostBySlug(slug: string): Promise<Post | undefined> {
    return this.#postRepository.findBySlug(slug).then((post) => post);
  }

  public async getPostsByTitle(title: string): Promise<Post[]> {
    return this.#postRepository.findManyByTitle(title, 6).then((post) => post);
  }

  public async getPosts(): Promise<Post[]> {
    return this.#postRepository.findAll().then((post) => post);
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    return await this.#postRepository.findWithPagination({
      skip,
      pageSize,
    });
  }

  public async getUserFavoritePostsByPagination(request: {
    userId: string;
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { userId, skip, pageSize } = request;
    const favorites = await this.#favoriteRepository.findAllByUserId(userId);
    const postIds = favorites.map((favorite) => favorite.reflect.postId);
    const favoritedPosts = await this.#postRepository.findByIds(postIds);
    return favoritedPosts.slice(Number(skip), Number(skip) + Number(pageSize));
  }
}
