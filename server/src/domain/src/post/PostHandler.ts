import type { IPostRepository } from "@typings/post";
import {
  FindAllFavoritesByUserIdCommand,
  FindByIdCommand,
} from "@/domain/globalsCommands";
import { userErrors } from "../user/helpers";
import { postErrors } from "./helpers";
import { UserSubscriber } from "../user";
import { Favorite, FavoriteSubscriber } from "../favorite";
import { DeletePostCommand } from "./PostCommands";

export class PostHandler {
  #postRepository: IPostRepository;
  #publisher: IPublisher;

  constructor(implementations: {
    postRepository: IPostRepository;
    publisher: IPublisher;
  }) {
    this.#postRepository = implementations.postRepository;
    this.#publisher = implementations.publisher;
  }

  async findSlugAndThrowError(slug: string) {
    await this.#postRepository.findBySlug(slug).then((slugFound) => {
      if (slugFound) {
        throw new Error(postErrors.slugAlreadyExists(slug));
      }
    });
  }

  async findUserIdOrThrowError(id: string) {
    const command = new FindByIdCommand(id);
    const targetSubscriber = UserSubscriber.getInstance();
    const { uniqueResponse: existingUser } = await this.#publisher.publish({
      command,
      targetSubscriber,
    });
    if (!existingUser) {
      throw new Error(userErrors.userNotFoundWithId(id));
    }
    return existingUser;
  }

  async findPostIdOrThrowError(id: string) {
    const existingPost = await this.#postRepository.findById(id);
    if (!existingPost) {
      throw new Error(postErrors.postNotFoundWithId(id));
    }
    return existingPost;
  }

  async getAllUserFavoritedPosts(userId: string) {
    const command = new FindAllFavoritesByUserIdCommand(userId);
    const targetSubscriber = FavoriteSubscriber.getInstance();
    const { uniqueResponse: favorites }: { uniqueResponse: Favorite[] } =
      await this.#publisher.publish({
        command,
        targetSubscriber,
      });
    const postIds = favorites.map((favorite) => favorite.reflect.postId);
    return await this.#postRepository.findByIds(postIds);
  }

  async publishDeletePost(postId: string) {
    const deletePostCommand = new DeletePostCommand(postId);
    await this.#publisher.publish({ command: deletePostCommand });
  }
}
