import type { IUserRepository } from "@typings/user";
import { userErrors } from "./helpers";
import { DeleteUserCommand } from "./UserCommands";
import { User } from "./User";

export class UserHandler {
  #userRepository: IUserRepository;
  #publisher: IPublisher;

  constructor(implementations: {
    userRepository: IUserRepository;
    publisher: IPublisher;
  }) {
    this.#userRepository = implementations.userRepository;
    this.#publisher = implementations.publisher;
  }

  async findEmailAndThrowError(email: string): Promise<void> {
    return this.#userRepository
      .findByEmail(email)
      .then((emailAlreadyExists) => {
        if (emailAlreadyExists) {
          throw new Error(userErrors.emailAlreadyExists);
        }
      });
  }

  async findUsernameAndThrowError(username: string): Promise<void> {
    return this.#userRepository
      .findByUsername(username)
      .then((usernameAlreadyExists) => {
        if (usernameAlreadyExists) {
          throw new Error(userErrors.usernameAlreadyExists);
        }
      });
  }

  async findIdOrThrowError(id: string): Promise<User> {
    return this.#userRepository.findById(id).then((existingUser) => {
      if (!existingUser) {
        throw new Error(userErrors.userNotFoundWithId(id));
      }
      return existingUser;
    });
  }

  async publishDeleteUser(id: string): Promise<void> {
    return this.#userRepository.delete(id).then(async () => {
      await this.#publisher.publish({ command: new DeleteUserCommand(id) });
    });
  }
}
