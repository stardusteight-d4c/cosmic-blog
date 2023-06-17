import type { IUserRepository } from "@typings/user";
import { userErrors } from "./helpers";

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
    const emailAlreadyExists = await this.#userRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new Error(userErrors.emailAlreadyExists);
    }
  }

  async findUsernameAndThrowError(username: string) {
    const usernameAlreadyExists = await this.#userRepository.findByUsername(
      username
    );
    if (usernameAlreadyExists) {
      throw new Error(userErrors.usernameAlreadyExists);
    }
  }

  async findIdOrThrowError(id: string) {
    const existingUser = await this.#userRepository.findById(id);
    if (!existingUser) {
      throw new Error(userErrors.userNotFoundWithId(id));
    }
    return existingUser;
  }
}
