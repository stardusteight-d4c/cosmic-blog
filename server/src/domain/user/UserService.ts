import {
  User,
  IUserReflectObject,
  IUserRepository,
  IUserService,
  UserEventPublisher,
  userBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { Favorite } from "@/domain/@object-values/favorite";
import {
  FavoritePostEvent,
  IPostRepository,
  Post,
} from "@domain/post";
import { Comment, CommentPostEvent } from "../comment";
import { CreatePostEvent } from "../post/PostEvents";

export class UserService implements IUserService {
  #userPublisher: UserEventPublisher;
  #userRepository: IUserRepository;
  #postRepository: IPostRepository;

  constructor(params: {
    userPublisher: UserEventPublisher;
    userRepository: IUserRepository;
    postRepository: IPostRepository;
  }) {
    this.#userPublisher = params.userPublisher;
    this.#userRepository = params.userRepository;
    this.#postRepository = params.postRepository;
  }

  public async createUser(user: IUserReflectObject): Promise<User> {
    const newUser = userBuilderFactory({ user });
    const userInstance = await this.#userRepository.create(newUser);
    return userInstance;
  }

  public async deleteUser(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    const user = await this.#userRepository.findById(userId);
    if (user) {
      const deletedUser = await this.#userRepository.delete(userId);
      return deletedUser;
    } else {
      throw new Error(`The user with ID: ${userId} was not found.`);
    }
  }

  public async findUserById(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    return await this.#userRepository.findById(userId);
  }

  public async findUserByEmail(userEmail: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userEmail, type: "string" });
    Validators.validateEmail(userEmail);
    return await this.#userRepository.findByEmail(userEmail);
  }

  public async changeEmail(data: {
    userId: string;
    confirmationPassword: string;
    newEmail: string;
  }): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: data.userId, type: "string" });
    Validators.validateEmail(data.newEmail);
    const user = await this.#userRepository.findById(data.userId);
    if (user) {
      Validators.compareCurrentPassword({
        inputPassword: data.confirmationPassword,
        currentPassword: user.reflect.password,
      });
      const updatedUserInstance = userBuilderFactory({
        user: user.reflect,
        update: { field: "email", newData: data.newEmail },
      });
      const changedUser = await this.#userRepository.update(
        updatedUserInstance,
      );
      return changedUser;
    } else {
      throw new Error(`The user with ID: ${data.userId} was not found.`);
    }
  }

  public async changePassword(data: {
    userId: string;
    confirmationPassword: string;
    newPassword: string;
  }): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: data.userId, type: "string" });
    Validators.validatePassword(data.newPassword);
    const user = await this.#userRepository.findById(data.userId);
    if (user) {
      Validators.compareCurrentPassword({
        inputPassword: data.confirmationPassword,
        currentPassword: user.password,
      });
      const updatedUserInstance = userBuilderFactory({
        user: user.reflect,
        update: { field: "password", newData: data.newPassword },
      });
      const changedUser = await this.#userRepository.update(
        updatedUserInstance,
      );
      return changedUser;
    } else {
      throw new Error(`The user with ID: ${data.userId} was not found.`);
    }
  }

  public async handlerCreatePostEvent(
    event: CreatePostEvent,
  ): Promise<User | undefined> {
    try {
      const { post } = event;
      const authorId = post.reflect.author.id;
      const author = await this.#userRepository.findById(authorId!);
      if (author) {
        const updatedPublishedPosts = [
          ...(author.reflect.publishedPosts?.map(
            (post) =>
              new Post({
                id: post.id,
                author: post.author,
                title: post.title,
                body: post.body,
                coverImage: post.coverImage,
                tags: post.tags,
                postedIn: post.postedIn,
                lastChange: post.lastChange,
                commentAmount: post.commentAmount,
                favorites: post.favorites,
              }),
          ) ?? []),
          post,
        ];
        const updatedUserInstance = userBuilderFactory({
          user: author.reflect,
          update: { field: "posts", newData: updatedPublishedPosts },
        });
        await this.#userRepository.update(updatedUserInstance);
        return updatedUserInstance;
      }
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async handlerFavoritePostEvent(
    favoritePostEvent: FavoritePostEvent,
  ): Promise<User | undefined> {
    const { userId, postId } = favoritePostEvent;
    const user = await this.#userRepository.findById(userId);
    if (user) {
      const index = user.reflect.favoritedPosts!.findIndex(
        (fav) => fav.postId === postId,
      );
      const isNotFavorited = index === -1;
      if (isNotFavorited) {
        const newFavorite = new Favorite({ userId, postId });
        const updatedFavoritedPosts = [
          ...(user.reflect.favoritedPosts?.map(
            (favorite) =>
              new Favorite({
                userId: favorite.userId,
                postId: favorite.postId,
              }),
          ) ?? []),
          newFavorite,
        ];
        const updatedUserInstance = userBuilderFactory({
          user: user.reflect,
          update: { field: "favorites", newData: updatedFavoritedPosts },
        });
        await this.#userRepository.update(updatedUserInstance);
        return updatedUserInstance;
      } else {
        const updatedFavoritedPosts = user.reflect.favoritedPosts?.filter(
          (favorite) => favorite.postId !== postId,
        );
        const updatedUserInstance = userBuilderFactory({
          user: user.reflect,
          update: { field: "favorites", newData: updatedFavoritedPosts },
        });
        await this.#userRepository.update(updatedUserInstance);
        return updatedUserInstance;
      }
    }
  }

  public async handlerCommentPostEvent(
    commentPostEvent: CommentPostEvent,
  ): Promise<Comment | undefined> {
    const { comment } = commentPostEvent;
    const user = await this.#userRepository.findById(comment.reflect.owner.id!);

    if (user) {
      const updatedCommentedPosts = [
        ...(user.reflect.commentedPosts?.map(
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
      const updatedUser = userBuilderFactory({
        user: user.reflect,
        update: { field: "comments", newData: updatedCommentedPosts },
      });
      await this.#userRepository.update(updatedUser);
      return comment;
    }
  }
}
