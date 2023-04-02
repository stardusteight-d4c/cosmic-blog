import {
  User,
  IUserReflectObject,
  IUserRepository,
  IUserService,
} from "../entities/User";
import { UserBuilder } from "../builders/UserBuilder";
import Validators from "../../utils/validators";

export default class UserService implements IUserService {
  #userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.#userRepository = userRepository;
  }

  emit_favoritedThePost(userId: string, postId: string): Promise<void> {
    throw new Error("Method not implemented.");
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
    const userExists = await this.#userRepository.findUserById(userId);
    if (userExists) {
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
}
