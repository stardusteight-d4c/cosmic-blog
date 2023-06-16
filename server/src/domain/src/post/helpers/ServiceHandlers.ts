import { IUserRepository } from "@typings/user";
import { err } from "./errors";
import { IPostRepository } from "@/@typings/post";
import { IFavoriteRepository } from "@/@typings/favorite";

namespace ServiceHandlers {
  export async function findSlugAndThrowError(params: {
    postRepository: IPostRepository;
    slug: string;
  }) {
    const { postRepository, slug } = params;
    const slugFound = await postRepository.findBySlug(slug);
    if (slugFound) {
      throw new Error(err.slugAlreadyExists(slug));
    }
  }

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

  export async function getAllUserFavoritedPosts(params: {
    favoriteRepository: IFavoriteRepository;
    postRepository: IPostRepository;
    userId: string;
  }) {
    const { favoriteRepository, postRepository, userId } = params;
    const favorites = await favoriteRepository.findAllByUserId(userId);
    const postIds = favorites.map((favorite) => favorite.reflect.postId);
    return await postRepository.findByIds(postIds);
  }
}

export default ServiceHandlers;
