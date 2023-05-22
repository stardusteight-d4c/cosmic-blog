import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  CommentPostEvent,
  FavoritePostEvent,
  PostEventPublisher,
  postBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { IUserRepository } from "@domain/user";
import { Comment } from "../comment";
import { IEventPublisher } from "../@interfaces";
import { CreatePostEvent } from "./PostEvents";
import { toggleFavorite } from "./helpers/toggleFavorite";
import { handleCommentPost } from "./helpers/handleCommentPost";

export class PostService implements IPostService {
  #postPublisher: IEventPublisher;
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;

  constructor(implementations: {
    postPublisher: PostEventPublisher;
    userRepository: IUserRepository;
    postRepository: IPostRepository;
  }) {
    this.#postPublisher = implementations.postPublisher;
    this.#postRepository = implementations.postRepository;
    this.#userRepository = implementations.userRepository;
  }

  public async emitCreatePostEvent(post: IPostReflectObject): Promise<Post> {
    await this.#userRepository.findById(post.author.id!);
    const newPost = postBuilderFactory({ post });
    const createPostEvent = new CreatePostEvent(newPost);
    const responses = await this.#postPublisher.emit(createPostEvent);
    const response = responses.find(
      (response) => response instanceof Post,
    ) as Post;
    return response;
  }

  public async emitToggleFavoritePostEvent(request: {
    userId: string;
    postId: string;
  }): Promise<Post | undefined> {
    const { userId, postId } = request;
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const user = await this.#userRepository.findById(userId);
    const post = await this.#postRepository.findById(postId);
    if (!user) {
      throw new Error(`The user with ID: ${userId} was not found.`);
    } else if (!post) {
      throw new Error(`The post with ID: ${postId} was not found.`);
    }
    const favoritePostEvent = new FavoritePostEvent(userId, postId);
    const responses = await this.#postPublisher.emit(favoritePostEvent);
    const response = responses.find(
      (response) => response instanceof Post,
    ) as Post;
    return response;
  }

  public async emitCommentPostEvent(
    comment: Comment,
  ): Promise<Comment | undefined> {
    await this.#userRepository.findById(comment.reflect.owner.id!);
    await this.#postRepository.findById(comment.reflect.postId);
    const commentPostEvent = new CommentPostEvent(comment);
    const responses = await this.#postPublisher.emit(commentPostEvent);
    const response = responses.find(
      (response) => response instanceof Comment,
    ) as Comment;
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

  public async handlerCreatePostEvent(
    event: CreatePostEvent,
  ): Promise<Post | undefined> {
    const { post } = event;
    const postInstance = await this.#postRepository.create(post);
    return postInstance;
  }

  public async handlerFavoritePostEvent(
    event: FavoritePostEvent,
  ): Promise<Post | undefined> {
    const { userId, postId } = event;
    const post = toggleFavorite({
      postRepository: this.#postRepository,
      postId: postId,
      userId: userId,
    });
    return post;
  }

  public async handlerCommentPostEvent(
    event: CommentPostEvent,
  ): Promise<Comment | undefined> {
    const { comment } = event;
    const result = handleCommentPost({
      postRepository: this.#postRepository,
      comment,
    });
    return result;
  }
}
