import type {
  IUserReflectObject,
  IUserRepository,
  IUserService,
} from "@typings/user";
import { User, userBuilderFactory } from ".";
import Validators from "@domain/helpers/Validators";
import DeleteUserCommand from "./UserCommands";
import ServiceValidators from "./helpers/ServiceValidators";

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
    const validatorData = { userRepository: this.#userRepository, user };
    await ServiceValidators.findEmail(validatorData);
    await ServiceValidators.findUsername(validatorData);
    return this.#userRepository.create(newUser).then((user) => user);
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

  public async updateUser(user: IUserReflectObject): Promise<User> {
    const updatedUser = userBuilderFactory({ user });
    const updatedUserInstance = await this.#userRepository.update(updatedUser);
    return updatedUserInstance;
  }
}
