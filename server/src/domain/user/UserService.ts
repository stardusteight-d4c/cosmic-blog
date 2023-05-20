import {
  User,
  IUserReflectObject,
  IUserRepository,
  IUserService,
  UserEventPublisher,
  userBuilderFactory,
} from ".";
import Validators from "@/utils/validators";
import { Favorite } from "@domain/favorite";
import {
  CommentPostEvent,
  FavoritePostEvent,
  IPostRepository,
} from "@domain/post";
import { Comment } from "../comment";

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
    const userInstance = await this.#userRepository.createUser(newUser);
    return userInstance;
  }

  public async deleteUser(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    const user = await this.#userRepository.findUserById(userId);
    if (user) {
      const deletedUser = await this.#userRepository.deleteUser(userId);
      return deletedUser;
    } else {
      throw new Error(`The user with ID: ${userId} was not found.`);
    }
  }

  public async findUserById(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    return await this.#userRepository.findUserById(userId);
  }

  public async findUserByEmail(userEmail: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userEmail, type: "string" });
    Validators.validateEmail(userEmail);
    return await this.#userRepository.findUserByEmail(userEmail);
  }

  public async changeEmail(data: {
    userId: string;
    confirmationPassword: string;
    newEmail: string;
  }): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: data.userId, type: "string" });
    Validators.validateEmail(data.newEmail);
    const user = await this.#userRepository.findUserById(data.userId);
    if (user) {
      Validators.compareCurrentPassword({
        inputPassword: data.confirmationPassword,
        currentPassword: user.reflect.password,
      });
      const updatedUserInstance = userBuilderFactory({
        user: user.reflect,
        update: { field: "email", newData: data.newEmail },
      });
      const changedUser = await this.#userRepository.updateUser(
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
    const user = await this.#userRepository.findUserById(data.userId);
    if (user) {
      Validators.compareCurrentPassword({
        inputPassword: data.confirmationPassword,
        currentPassword: user.password,
      });
      const updatedUserInstance = userBuilderFactory({
        user: user.reflect,
        update: { field: "password", newData: data.newPassword },
      });
      const changedUser = await this.#userRepository.updateUser(
        updatedUserInstance,
      );
      return changedUser;
    } else {
      throw new Error(`The user with ID: ${data.userId} was not found.`);
    }
  }

  public async handlerFavoritePostEvent(
    favoritePostEvent: FavoritePostEvent,
  ): Promise<User | undefined> {
    const { userId, postId } = favoritePostEvent;
    const user = await this.#userRepository.findUserById(userId);
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
        await this.#userRepository.updateUser(updatedUserInstance);
        return updatedUserInstance;
      } else {
        const updatedFavoritedPosts = user.reflect.favoritedPosts?.filter(
          (favorite) => favorite.postId !== postId,
        );
        const updatedUserInstance = userBuilderFactory({
          user: user.reflect,
          update: { field: "favorites", newData: updatedFavoritedPosts },
        });
        await this.#userRepository.updateUser(updatedUserInstance);
        return updatedUserInstance;
      }
    }
  }

  public async handlerCommentPostEvent(
    commentPostEvent: CommentPostEvent,
  ): Promise<Comment | undefined> {
    const { comment, postId } = commentPostEvent;
    const user = await this.#userRepository.findUserById(
      comment.reflect.owner.id!,
    );

    if (user) {
      const updatedCommentedPosts = [
        ...(user.reflect.commentedPosts?.map(
          (comment) =>
            new Comment({
              id: comment.id,
              owner: comment.owner,
              content: comment.content,
              postedAt: comment.postedAt,
            }),
        ) ?? []),
        comment,
      ];
    }

    const obj = {} as any;
    return obj;
  }
}
