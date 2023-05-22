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
import Validators from "@/domain/utils/validators";
import { Favorite } from "@/domain/favorite";
import { IUserRepository } from "@domain/user";
import { Comment } from "../comment";
import { IEventPublisher } from "../@interfaces";
import { CreatePostEvent } from "./PostEvents";

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

  public async emitFavoritePostEvent(request: {
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
    const user = await this.#userRepository.findById(comment.reflect.owner.id!);
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
    const post = await this.#postRepository.findById(postId);
    if (post) {
      const index = post.reflect.favorites!.findIndex(
        (fav) => fav.userId === userId,
      );
      const isNotFavorited = index === -1;
      if (isNotFavorited) {
        const newFavorite = new Favorite({ userId, postId });
        const updatedPostFavorites = [
          ...(post.reflect.favorites?.map(
            (favorite) =>
              new Favorite({
                userId: favorite.userId,
                postId: favorite.postId,
              }),
          ) ?? []),
          newFavorite,
        ];
        const updatedPostInstance = postBuilderFactory({
          post: post.reflect,
          update: { field: "favorites", newData: updatedPostFavorites },
        });
        await this.#postRepository.update(updatedPostInstance);
        return updatedPostInstance;
      } else {
        const updatedPostFavorites = post.reflect.favorites?.filter(
          (favorite) => favorite.postId !== postId,
        );
        const updatedPostInstance = postBuilderFactory({
          post: post.reflect,
          update: { field: "favorites", newData: updatedPostFavorites },
        });
        await this.#postRepository.update(updatedPostInstance);
        return updatedPostInstance;
      }
    }
  }

  public async handlerCommentPostEvent(
    event: CommentPostEvent,
  ): Promise<Comment | undefined> {
    const { comment } = event;
    const post = await this.#postRepository.findById(comment.reflect.postId);
    if (post) {
      const updatedPostComments = [
        ...(post.reflect.comments?.map(
          (comment) =>
            new Comment({
              id: comment.id,
              postId: comment.postId,
              owner: comment.owner,
              content: comment.content,
              postedAt: comment.postedAt,
            }),
        ) ?? []),
        comment,
      ];
      const updatedPost = postBuilderFactory({
        post: post.reflect,
        update: { field: "comments", newData: updatedPostComments },
      });
      await this.#postRepository.update(updatedPost);
      return comment;
    }
  }
}
