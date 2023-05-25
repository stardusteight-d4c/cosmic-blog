import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  FavoritePostEvent,
  postBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { IUserRepository } from "@domain/user";
import {
  Comment,
  CreateCommentEvent,
  DeleteCommentEvent,
} from "@domain/comment";
import { IEventPublisher } from "../@interfaces";
import { toggleFavorite, handleCommentAmountPost } from "./helpers";

export class PostService implements IPostService {
  #postPublisher: IEventPublisher;
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;

  constructor(implementations: {
    postPublisher: IEventPublisher;
    userRepository: IUserRepository;
    postRepository: IPostRepository;
  }) {
    this.#postPublisher = implementations.postPublisher;
    this.#postRepository = implementations.postRepository;
    this.#userRepository = implementations.userRepository;
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    await this.#userRepository.findById(post.author.id!);
    const newPost = postBuilderFactory({ post });
    const postInstance = await this.#postRepository.create(newPost);
    return postInstance;
  }

  public async emitToggleFavoritePostEvent(request: {
    userId: string;
    postId: string;
  }): Promise<Post | undefined> {
    const { userId, postId } = request;
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const favoritePostEvent = new FavoritePostEvent(userId, postId);
    const responses = await this.#postPublisher.emit(favoritePostEvent);
    const response = responses.find(
      (response) => response instanceof Post,
    ) as Post;
    return response;
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    const updatedPost = postBuilderFactory({ post });
    const updatedPostInstance = await this.#postRepository.update(updatedPost);
    return updatedPostInstance;
  }

  public async findPostById(postId: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    return await this.#postRepository.findById(postId);
  }

  public async findPostByTitle(postTitle: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postTitle, type: "string" });
    return await this.#postRepository.findByTitle(postTitle);
  }

  public async getPosts(): Promise<Post[]> {
    const posts = await this.#postRepository.get();
    return posts;
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const posts = await this.#postRepository.getByPagination({
      skip,
      pageSize,
    });
    return posts;
  }

  public async handlerFavoritePostEvent(
    event: FavoritePostEvent,
  ): Promise<Post | undefined> {
    const { userId, postId } = event;
    const post = await toggleFavorite({
      postRepository: this.#postRepository,
      postId: postId,
      userId: userId,
    });
    return post;
  }

  public async handlerCreateCommentEvent(
    event: CreateCommentEvent,
  ): Promise<Comment | undefined> {
    const { comment } = event;
    const result = await handleCommentAmountPost({
      postRepository: this.#postRepository,
      comment,
      action: "sum",
    });
    return result;
  }

  public async handlerDeleteCommentEvent(
    event: DeleteCommentEvent,
  ): Promise<void> {
    const { comment } = event;
    await handleCommentAmountPost({
      postRepository: this.#postRepository,
      comment,
      action: "sub",
    });
  }
}
