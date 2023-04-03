import {
  User,
  IUserReflectObject,
  IUserRepository,
  IUserService,
} from "../entities/User";
import { UserBuilder } from "../builders/UserBuilder";
import Validators from "../../utils/validators";
import { IPostRepository } from "../entities/Post";
import { FavoritePostCommand } from "../bus/commands/UserCommand";
import { UserPublisher } from "../bus/publishers/UserPublisher";
import { Favorite } from "../entities/Favorite";

export default class UserService implements IUserService {
  #userPublisher: UserPublisher;
  #userRepository: IUserRepository;
  #postRepository: IPostRepository;

  constructor(params: {
    userPublisher: UserPublisher;
    userRepository: IUserRepository;
    postRepository: IPostRepository;
  }) {
    this.#userPublisher = params.userPublisher;
    this.#userRepository = params.userRepository;
    this.#postRepository = params.postRepository;
  }

  public async publishFavoritePostCommand(
    userId: string,
    postId: string,
  ): Promise<User | undefined> {
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
    const response = this.#userPublisher.publish(favoritePostCommand);
    return response;
  }

  public async createUser(user: IUserReflectObject): Promise<User> {
    const newUser = new UserBuilder()
      .setEmail(user.email)
      .setUsername(user.username)
      .setPassword(user.password)
      .build();
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
      const updatedUserInstance = new UserBuilder()
        .setId(user.reflect.id!)
        .setEmail(data.newEmail)
        .setUsername(user.reflect.username)
        .setPassword(user.reflect.password)
        .build();
      const changedUser = await this.#userRepository.changeEmail(
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
      const updatedUserInstance = new UserBuilder()
        .setId(user.reflect.id!)
        .setEmail(user.reflect.email)
        .setUsername(user.reflect.username)
        .setPassword(data.newPassword)
        .build();
      const changedUser = await this.#userRepository.changePassword(
        updatedUserInstance,
      );
      return changedUser;
    } else {
      throw new Error(`The user with ID: ${data.userId} was not found.`);
    }
  }

  public async handlerFavoritePostCommand(
    favoritePostCommand: FavoritePostCommand,
  ): Promise<User | undefined> {
    const { userId, postId } = favoritePostCommand;
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
        const updatedUserInstance = new UserBuilder()
          .setId(user.reflect.id!)
          .setEmail(user.reflect.email)
          .setUsername(user.reflect.username)
          .setPassword(user.reflect.password)
          .setFavoritedPosts(updatedFavoritedPosts)
          .build();
        await this.#userRepository.toggleFavorite(updatedUserInstance);
        return updatedUserInstance;
      } else {
        const updatedFavoritedPosts = user.reflect.favoritedPosts?.filter(
          (favorite) => favorite.postId !== postId,
        );
        const updatedUserInstance = new UserBuilder()
          .setId(user.reflect.id!)
          .setEmail(user.reflect.email)
          .setUsername(user.reflect.username)
          .setPassword(user.reflect.password)
          .setFavoritedPosts(updatedFavoritedPosts as Favorite[])
          .build();
        await this.#userRepository.toggleFavorite(updatedUserInstance);
        return updatedUserInstance;
      }
    }
  }
}
