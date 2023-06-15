import { IUserReflectObject, IUserRepository } from "@/@typings/user";
import { err } from "./errors";

namespace ServiceHandlers {
  export async function findEmailOrThrowError(params: {
    userRepository: IUserRepository;
    email: string;
  }) {
    const { userRepository, email } = params;
    const emailAlreadyExists = await userRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new Error(err.emailAlreadyExists);
    }
  }

  export async function findUsernameOrThrowError(params: {
    userRepository: IUserRepository;
    username: string;
  }) {
    const { userRepository, username } = params;
    const usernameAlreadyExists = await userRepository.findByUsername(username);
    if (usernameAlreadyExists) {
      throw new Error(err.usernameAlreadyExists);
    }
  }

  export async function findIdOrThrowError(params: {
    userRepository: IUserRepository;
    id: string;
  }) {
    const { userRepository, id } = params;
    const existingUser = await userRepository.findById(id);
    if (!existingUser) {
      throw new Error(err.userNotFoundWithId(id));
    }
    return existingUser;
  }
}

export default ServiceHandlers;
