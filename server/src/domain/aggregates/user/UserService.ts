import type {
  IUserReflectObject,
  IUserRepository,
  IUserService,
} from "@typings/user";
import { Publisher } from "@domain/Publisher";
import { UserHandler } from "./UserHandler";
import { User, userBuilderFactory } from ".";

export class UserService implements IUserService {
  #handler: UserHandler;

  constructor(readonly userRepository: IUserRepository) {
    const publisher = Publisher.getInstance();
    this.#handler = new UserHandler({ userRepository, publisher });
  }

  public async createUser(user: IUserReflectObject): Promise<User> {
    return this.#handler.findEmailAndThrowError(user.email).then(async () => {
      await this.#handler.findUsernameAndThrowError(user.username);
      return this.userRepository
        .create(userBuilderFactory(user))
        .then((user) => user);
    });
  }

  public async updateUser(updatedUser: IUserReflectObject): Promise<User> {
    return this.#handler
      .findIdOrThrowError(updatedUser.id)
      .then(async (existingUser) => {
        return await this.userRepository.update(
          new User(updatedUser),
          existingUser
        );
      });
  }

  public async deleteUser(id: string): Promise<void> {
    return this.#handler
      .findIdOrThrowError(id)
      .then(() => this.#handler.publishDeleteUser(id));
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return await this.userRepository.findById(id);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(email);
  }

  public async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }

  public async getUsersByUsername(username: string): Promise<User[]> {
    return await this.userRepository.findManyByUsername(username, 6);
  }
}
