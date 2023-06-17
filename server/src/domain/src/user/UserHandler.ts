import type { IUserRepository } from "@typings/user";
import { userErrors } from "./helpers";
import { DeleteUserCommand } from "./UserCommands";

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

  async findEmailAndThrowError(email: string) {
    return this.#userRepository
      .findByEmail(email)
      .then((emailAlreadyExists) => {
        if (emailAlreadyExists) {
          throw new Error(userErrors.emailAlreadyExists);
        }
      });
  }

  async findUsernameAndThrowError(username: string) {
    return this.#userRepository
      .findByUsername(username)
      .then((usernameAlreadyExists) => {
        if (usernameAlreadyExists) {
          throw new Error(userErrors.usernameAlreadyExists);
        }
      });
  }

  async findIdOrThrowError(id: string) {
    return this.#userRepository.findById(id).then((existingUser) => {
      if (!existingUser) {
        throw new Error(userErrors.userNotFoundWithId(id));
      }
      return existingUser;
    });
  }

  async publishDeleteUser(id: string) {
    return this.#userRepository.delete(id).then(async () => {
      await this.#publisher.publish({ command: new DeleteUserCommand(id) });
    });
  }
}
