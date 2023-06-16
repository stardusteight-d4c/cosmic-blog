import type { IUserRepository } from "@typings/user";
import { userErrors } from "./errors";

namespace ServiceHandlers {
  export async function findEmailAndThrowError(params: {
    userRepository: IUserRepository;
    email: string;
  }) {
    const { userRepository, email } = params;
    const emailAlreadyExists = await userRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new Error(userErrors.emailAlreadyExists);
    }
  }

  export async function findUsernameAndThrowError(params: {
    userRepository: IUserRepository;
    username: string;
  }) {
    const { userRepository, username } = params;
    const usernameAlreadyExists = await userRepository.findByUsername(username);
    if (usernameAlreadyExists) {
      throw new Error(userErrors.usernameAlreadyExists);
    }
  }

  export async function findIdOrThrowError(params: {
    userRepository: IUserRepository;
    id: string;
  }) {
    const { userRepository, id } = params;
    const existingUser = await userRepository.findById(id);
    if (!existingUser) {
      throw new Error(userErrors.userNotFoundWithId(id));
    }
    return existingUser;
  }
}

export default ServiceHandlers;
