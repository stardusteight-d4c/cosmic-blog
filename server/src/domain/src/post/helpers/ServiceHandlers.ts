import type { IPostRepository } from "@typings/post";
import {
  FindAllFavoritesByUserIdCommand,
  FindByIdCommand,
} from "@domain/globalsCommands";
import { postErrors } from "./errors";
import { UserSubscriber } from "../../user";
import { Favorite, FavoriteSubscriber } from "../../favorite";
import { userErrors } from "../../user/helpers";

namespace ServiceHandlers {
  export async function findSlugAndThrowError(params: {
    postRepository: IPostRepository;
    slug: string;
  }) {
    const { postRepository, slug } = params;
    const slugFound = await postRepository.findBySlug(slug);
    if (slugFound) {
      throw new Error(postErrors.slugAlreadyExists(slug));
    }
  }

  export async function findUserIdOrThrowError(params: {
    id: string;
    publisher: IPublisher;
  }) {
    const { id, publisher } = params;
    const command = new FindByIdCommand(id);
    const targetSubscriber = UserSubscriber.getInstance();
    const { uniqueResponse: existingUser } = await publisher.publish({
      command,
      targetSubscriber,
    });
    if (!existingUser) {
      throw new Error(userErrors.userNotFoundWithId(id));
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
      throw new Error(postErrors.postNotFoundWithId(id));
    }
    return existingPost;
  }

  export async function getAllUserFavoritedPosts(params: {
    postRepository: IPostRepository;
    userId: string;
    publisher: IPublisher;
  }) {
    const { postRepository, userId, publisher } = params;
    const command = new FindAllFavoritesByUserIdCommand(userId);
    const targetSubscriber = FavoriteSubscriber.getInstance();
    const { uniqueResponse: favorites }: { uniqueResponse: Favorite[] } =
      await publisher.publish({
        command,
        targetSubscriber,
      });
    const postIds = favorites.map((favorite) => favorite.reflect.postId);
    return await postRepository.findByIds(postIds);
  }
}

export default ServiceHandlers;
