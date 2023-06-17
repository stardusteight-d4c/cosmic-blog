import type {
  IUserReflectObject,
  IUserRepository,
  IUserService,
} from "@typings/user";
import { publisher } from "@domain/helpers/initializeServices";
import { Publisher } from "@domain/Publisher";
import { UserHandler } from "./UserHandler";
import { DeleteUserCommand } from "./UserCommands";
import { User, userBuilderFactory } from ".";

export class UserService implements IUserService {
  #handler: UserHandler;

  constructor(readonly userRepository: IUserRepository) {
    const publisher = Publisher.getInstance();
    this.#handler = new UserHandler({ userRepository, publisher });
  }

  public async createUser(user: IUserReflectObject): Promise<User> {
    await this.#handler.findEmailAndThrowError(user.email);
    await this.#handler.findUsernameAndThrowError(user.username);
    return await this.userRepository.create(userBuilderFactory(user));
  }

  public async updateUser(updatedUser: IUserReflectObject): Promise<User> {
    const existingUser = await this.#handler.findIdOrThrowError(updatedUser.id);
    const updatedUserInstance = new User(updatedUser);
    return await this.userRepository.update(updatedUserInstance, existingUser);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.#handler.findIdOrThrowError(id);
    await this.userRepository.delete(id);
    const deleteUserCommand = new DeleteUserCommand(id);
    await publisher.publish({ command: deleteUserCommand });
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findById(id).then((user) => user);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findByEmail(email).then((user) => user);
  }

  public async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username).then((user) => user);
  }

  public async getUsersByUsername(username: string): Promise<User[]> {
    return await this.userRepository.findManyByUsername(username, 6);
  }
}
