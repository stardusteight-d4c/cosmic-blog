import { IUserRepository } from "@typings/user";
import { err } from "./errors";
import { IPostRepository } from "@/@typings/post";

namespace ServiceHandlers {
  export async function findUserIdOrThrowError(params: {
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

  export async function findPostIdOrThrowError(params: {
    postRepository: IPostRepository;
    id: string;
  }) {
    const { postRepository, id } = params;
    const existingPost = await postRepository.findById(id);
    if (!existingPost) {
      throw new Error(err.postNotFoundWithId(id));
    }
    return existingPost;
  }
}

export default ServiceHandlers;
