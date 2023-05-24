import {
  User,
  IUserReflectObject,
  IUserRepository,
  IUserService,
  UserEventPublisher,
  userBuilderFactory,
  toggleFavorite,
} from ".";
import Validators from "@/domain/@utils/validators";
import { FavoritePostEvent, IPostRepository } from "@domain/post";
import { Comment, CreateCommentEvent, DeleteCommentEvent } from "../comment";
import { handleCommentedPosts } from "./helpers/handleCommentedPosts";

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

  public async handlerFavoritePostEvent(
    event: FavoritePostEvent,
  ): Promise<User | undefined> {
    const { userId, postId } = event;
    const user = await toggleFavorite({
      userRepository: this.#userRepository,
      postId: postId,
      userId: userId,
    });
    return user;
  }

  public async handlerCreateCommentEvent(
    event: CreateCommentEvent,
  ): Promise<Comment | undefined> {
    const { comment } = event;
    const result = await handleCommentedPosts({
      userRepository: this.#userRepository,
      comment,
      action: "sum",
    });
    return result;
  }

  public async handlerDeleteCommentEvent(
    event: DeleteCommentEvent,
  ): Promise<void> {
    const { comment } = event;
    handleCommentedPosts({
      userRepository: this.#userRepository,
      comment,
      action: "sub",
    });
  }
}
