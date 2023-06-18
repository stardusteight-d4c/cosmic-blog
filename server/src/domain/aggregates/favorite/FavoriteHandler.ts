import type { IFavoriteRepository } from "@typings/favorite";
import { FindByIdCommand } from "@domain/commands";
import { User, UserSubscriber } from "../user";
import { userErrors } from "../user/helpers";
import { Post, PostSubscriber } from "../post";
import { postErrors } from "../post/helpers";
import { Favorite } from "./Favorite";

type UserResponse = { uniqueResponse: User };
type PostResponse = { uniqueResponse: Post };

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

  async findUserIdOrThrowError(id: string): Promise<User> {
    return this.#publisher
      .publish({
        command: new FindByIdCommand(id),
        targetSubscriber: UserSubscriber.getInstance(),
      })
      .then(async ({ uniqueResponse: existingUser }: UserResponse) => {
        if (!existingUser) {
          throw new Error(userErrors.userNotFoundWithId(id));
        }
        return existingUser;
      });
  }

  async findPostIdOrThrowError(id: string): Promise<Post> {
    return this.#publisher
      .publish({
        command: new FindByIdCommand(id),
        targetSubscriber: PostSubscriber.getInstance(),
      })
      .then(async ({ uniqueResponse: existingPost }: PostResponse) => {
        if (!existingPost) {
          throw new Error(postErrors.postNotFoundWithId(id));
        }
        return existingPost;
      });
  }

  async findFavoriteByKey(key: string): Promise<Favorite> {
    return await this.#favoriteRepository.findFavoriteByKey(key);
  }
}
