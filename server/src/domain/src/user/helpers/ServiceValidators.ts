import { IUserReflectObject, IUserRepository } from "@typings/user";
import { err } from "./errors";

namespace ServiceValidators {
  export async function findEmail(params: {
    userRepository: IUserRepository;
    user: IUserReflectObject;
  }) {
    const { userRepository, user } = params;
    const emailAlreadyExists = await userRepository.findByEmail(user.email);
    if (emailAlreadyExists) {
      throw new Error(err.emailAlreadyExists);
    }
  }

  export async function findUsername(params: {
    userRepository: IUserRepository;
    user: IUserReflectObject;
  }) {
    const { userRepository, user } = params;
    const usernameAlreadyExists = await userRepository.findByUsername(
      user.username
    );
    if (usernameAlreadyExists) {
      throw new Error(err.usernameAlreadyExists);
    }
  }
}

export default ServiceValidators;
