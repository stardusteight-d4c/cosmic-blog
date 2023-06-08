import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  postBuilderFactory,
} from ".";
import Validators from "@domain/@utils/validators";
import { IPublisher } from "@domain/@interfaces";
import DeletePostCommand from "./PostCommands";
import { IUserRepository } from "../user";
import { IFavoriteRepository } from "../favorite";

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
    await this.#userRepository.findById(post.author.id);
    const newPost = postBuilderFactory({ post });
    const postInstance = await this.#postRepository.create(newPost);
    return postInstance;
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    const updatedPost = postBuilderFactory({ post });
    const updatedPostInstance = await this.#postRepository.update(updatedPost);
    return updatedPostInstance;
  }

  public async deletePost(postId: string): Promise<void> {
    await this.#postRepository.delete(postId);
    if (this.#publisher) {
      const deletePostCommand = new DeletePostCommand(postId);
      await this.#publisher.emit(deletePostCommand);
    }
  }

  public async getPostById(postId: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const post = await this.#postRepository.findById(postId);
    return post;
  }

  public async getPostsByTitle(postTitle: string): Promise<Post[]> {
    Validators.checkPrimitiveType({ validating: postTitle, type: "string" });
    const posts = await this.#postRepository.findManyByTitle(postTitle);
    return posts;
  }

  public async getPosts(): Promise<Post[]> {
    const posts = await this.#postRepository.findAll();
    return posts;
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const posts = await this.#postRepository.findWithPagination({
      skip,
      pageSize,
    });
    return posts;
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
    const paginatedPosts = favoritedPosts.slice(
      Number(skip),
      Number(skip) + Number(pageSize),
    );
    return paginatedPosts;
  }
}
