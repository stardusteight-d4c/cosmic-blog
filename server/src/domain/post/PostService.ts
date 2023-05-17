import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  PostPublisher,
  FavoritePostCommand,
} from ".";
import Validators from "@/utils/validators";
import { Favorite } from "@/domain/favorite";
import { IUserRepository } from "@domain/user/@interfaces";
import { postBuilderFactory } from "./utils/postBuilderFactory";

export default class PostService implements IPostService {
  #postPublisher: PostPublisher;
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;

  constructor(params: {
    postPublisher: PostPublisher;
    userRepository: IUserRepository;
    postRepository: IPostRepository;
  }) {
    this.#postPublisher = params.postPublisher;
    this.#postRepository = params.postRepository;
    this.#userRepository = params.userRepository;
  }
  public async publishFavoritePostCommand(
    userId: string,
    postId: string,
  ): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const user = await this.#userRepository.findUserById(userId);
    const post = await this.#postRepository.findPostById(postId);
    if (!user) {
      throw new Error(`The user with ID: ${userId} was not found.`);
    } else if (!post) {
      throw new Error(`The post with ID: ${postId} was not found.`);
    }
    const favoritePostCommand = new FavoritePostCommand(userId, postId);
    const responses = await this.#postPublisher.publish(favoritePostCommand);
    const response = responses.find(
      (response) => response instanceof Post,
    ) as Post;
    return response;
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    const newPost = postBuilderFactory({ post });
    const postInstance = await this.#postRepository.createPost(newPost);
    return postInstance;
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    const updatedPost = postBuilderFactory({ post });
    const updatedPostInstance = await this.#postRepository.updatePost(
      updatedPost,
    );
    return updatedPostInstance;
  }

  public async findPostById(postId: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    return await this.#postRepository.findPostById(postId);
  }

  public async findPostByTitle(postTitle: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postTitle, type: "string" });
    return await this.#postRepository.findPostByTitle(postTitle);
  }

  public async handlerFavoritePostCommand(
    favoritePostCommand: FavoritePostCommand,
  ): Promise<Post | undefined> {
    const { userId, postId } = favoritePostCommand;
    const post = await this.#postRepository.findPostById(postId);
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
        await this.#postRepository.toggleFavorite(updatedPostInstance);
        return updatedPostInstance;
      } else {
        const updatedPostFavorites = post.reflect.favorites?.filter(
          (favorite) => favorite.postId !== postId,
        );
        const updatedPostInstance = postBuilderFactory({
          post: post.reflect,
          update: { field: "favorites", newData: updatedPostFavorites },
        });
        await this.#postRepository.toggleFavorite(updatedPostInstance);
        return updatedPostInstance;
      }
    }
  }
}
