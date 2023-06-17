import { IFavoriteRepository } from "@typings/favorite";
import { FindByIdCommand } from "@domain/globalsCommands";
import { UserSubscriber } from "../user";
import { userErrors } from "../user/helpers";
import { PostSubscriber } from "../post";
import { postErrors } from "../post/helpers";

export class FavoriteHandler {
  #favoriteRepository: IFavoriteRepository;
  #publisher: IPublisher;

  constructor(implementations: {
    favoriteRepository: IFavoriteRepository;
    publisher: IPublisher;
  }) {
    this.#favoriteRepository = implementations.favoriteRepository;
    this.#publisher = implementations.publisher;
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
    const command = new FindByIdCommand(id);
    const targetSubscriber = PostSubscriber.getInstance();
    const { uniqueResponse: existingPost } = await this.#publisher.publish({
      command,
      targetSubscriber,
    });
    if (!existingPost) {
      throw new Error(postErrors.postNotFoundWithId(id));
    }
    return existingPost;
  }

  async findFavoriteByKey(key: string) {
    return await this.#favoriteRepository.findFavoriteByKey(key);
  }
}
