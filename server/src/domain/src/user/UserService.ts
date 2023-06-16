import type {
  IUserReflectObject,
  IUserRepository,
  IUserService,
} from "@typings/user";
import { User, userBuilderFactory } from ".";
import DeleteUserCommand from "./UserCommands";
import ServiceHandlers from "./helpers/ServiceHandlers";

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
    await ServiceHandlers.findEmailAndThrowError({
      userRepository: this.#userRepository,
      email: user.email,
    });
    await ServiceHandlers.findUsernameAndThrowError({
      userRepository: this.#userRepository,
      username: user.username,
    });
    return this.#userRepository.create(newUser).then((user) => user);
  }

  public async updateUser(updatedUser: IUserReflectObject): Promise<User> {
    const existingUser = await ServiceHandlers.findIdOrThrowError({
      userRepository: this.#userRepository,
      id: updatedUser.id,
    });
    return this.#userRepository
      .update(new User(updatedUser), existingUser)
      .then((user) => user);
  }

  public async deleteUser(id: string): Promise<void> {
    ServiceHandlers.findIdOrThrowError({
      userRepository: this.#userRepository,
      id,
    });
    await this.#userRepository.delete(id);
    if (this.#publisher) {
      const deleteUserCommand = new DeleteUserCommand(id);
      await this.#publisher.emit(deleteUserCommand);
    }
  }

  public async getUserById(id: string): Promise<User | undefined> {
    return this.#userRepository.findById(id).then((user) => user);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.#userRepository.findByEmail(email).then((user) => user);
  }

  public async getUserByUsername(username: string): Promise<User> {
    return this.#userRepository.findByUsername(username).then((user) => user);
  }

  public async getUsersByUsername(username: string): Promise<User[]> {
    return this.#userRepository
      .findManyByUsername(username, 6)
      .then((user) => user);
  }
}
