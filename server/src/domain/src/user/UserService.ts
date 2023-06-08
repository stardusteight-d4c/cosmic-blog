import {
  User,
  IUserReflectObject,
  IUserRepository,
  IUserService,
  userBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { IPublisher } from "@domain/@interfaces";
import DeleteUserCommand from "./UserCommands";

export class UserService implements IUserService {
  #userRepository: IUserRepository;
  #publisher?: IPublisher;

  constructor(implementations: {
    userRepository: IUserRepository;
    publisher?: IPublisher;
  }) {
    this.#userRepository = implementations.userRepository;
    if (implementations.publisher) {
      this.#publisher = implementations.publisher;
    }
  }

  public async createUser(user: IUserReflectObject): Promise<User> {
    const newUser = userBuilderFactory({ user });
    const emailAlreadyExists = await this.#userRepository.findByEmail(
      user.email,
    );
    const usernameAlreadyExists = await this.#userRepository.findByUsername(
      user.username,
    );
    if (emailAlreadyExists) {
      throw new Error("Email already exists");
    }
    if (usernameAlreadyExists) {
      throw new Error("Username already exists");
    }
    const userInstance = await this.#userRepository.create(newUser);
    return userInstance;
  }

  public async deleteUser(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    const user = await this.#userRepository.findById(userId);
    if (user) {
      const deletedUser = await this.#userRepository.delete(userId);
      if (this.#publisher) {
        const deleteUserCommand = new DeleteUserCommand(userId);
        await this.#publisher.emit(deleteUserCommand);
      }
      return deletedUser;
    }
    throw new Error(`The user with ID: ${userId} was not found.`);
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    const user = await this.#userRepository.findById(userId);
    return user;
  }

  public async getUserByEmail(userEmail: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userEmail, type: "string" });
    Validators.validateEmail(userEmail);
    return await this.#userRepository.findByEmail(userEmail);
  }

  public async getUserByUsername(username: string): Promise<User> {
    Validators.checkPrimitiveType({ validating: username, type: "string" });
    return await this.#userRepository.findByUsername(username);
  }

  public async getUsersByUsername(username: string): Promise<User[]> {
    const users = await this.#userRepository.findManyByUsername(username);
    return users;
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
    }
    throw new Error(`The user with ID: ${data.userId} was not found.`);
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
    }
    throw new Error(`The user with ID: ${data.userId} was not found.`);
  }

  public async updateUser(user: IUserReflectObject): Promise<User> {
    const updatedUser = userBuilderFactory({ user });
    const updatedUserInstance = await this.#userRepository.update(updatedUser);
    return updatedUserInstance;
  }
}
