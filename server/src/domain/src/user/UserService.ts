import type {
  IUserReflectObject,
  IUserRepository,
  IUserService,
} from "@typings/user";
import { User, userBuilderFactory } from ".";
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
    
    return this.#userRepository.create(newUser).then((user) => user);
  }

  public async updateUser(updatedUser: IUserReflectObject): Promise<User> {
    return this.#userRepository
      .update(new User(updatedUser))
      .then((user) => user);
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.#userRepository.delete(userId);
    if (this.#publisher) {
      const deleteUserCommand = new DeleteUserCommand(userId);
      await this.#publisher.emit(deleteUserCommand);
    }
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    return this.#userRepository.findById(userId).then((user) => user);
  }

  public async getUserByEmail(userEmail: string): Promise<User | undefined> {
    return this.#userRepository.findByEmail(userEmail).then((user) => user);
  }

  public async getUserByUsername(username: string): Promise<User> {
    return this.#userRepository.findByUsername(username).then((user) => user);
  }

  public async getUsersByUsername(username: string): Promise<User[]> {
    return this.#userRepository
      .findManyByUsername(username)
      .then((user) => user);
  }
}
