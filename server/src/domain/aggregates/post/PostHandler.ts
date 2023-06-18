import type { IPostRepository } from "@typings/post";
import {
  FindAllFavoritesByUserIdCommand,
  FindByIdCommand,
  FindFavoriteCommand,
} from "@domain/commands";
import { userErrors } from "../user/helpers";
import { postErrors } from "./helpers";
import { User, UserSubscriber } from "../user";
import { Favorite, FavoriteSubscriber } from "../favorite";
import {
  DeletePostCommand,
  GetPostCommentAmountCommand,
  GetPostFavoriteAmountCommand,
} from "./PostCommands";
import { Post } from "./Post";
import { CommentSubscriber } from "../comment";

type UserReponse = { uniqueResponse: User };
type FavoriteArrayResponse = { uniqueResponse: Favorite[] };
type AmountResponse = { uniqueResponse: number };
type FindFavoriteResponse = { uniqueResponse: Favorite };

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

  async findSlugAndThrowError(slug: string): Promise<void> {
    return this.#postRepository.findBySlug(slug).then((slugFound) => {
      if (slugFound) {
        throw new Error(postErrors.slugAlreadyExists(slug));
      }
    });
  }

  async findUserIdOrThrowError(id: string): Promise<User> {
    return this.#publisher
      .publish({
        command: new FindByIdCommand(id),
        targetSubscriber: UserSubscriber.getInstance(),
      })
      .then(async ({ uniqueResponse: existingUser }: UserReponse) => {
        if (!existingUser) {
          throw new Error(userErrors.userNotFoundWithId(id));
        }
        return existingUser;
      });
  }

  async findPostIdOrThrowError(id: string): Promise<Post> {
    return this.#postRepository.findById(id).then(async (existingPost) => {
      if (!existingPost) {
        throw new Error(postErrors.postNotFoundWithId(id));
      }
      return existingPost;
    });
  }

  async getAllUserFavoritedPosts(userId: string): Promise<Post[]> {
    return this.#publisher
      .publish({
        command: new FindAllFavoritesByUserIdCommand(userId),
        targetSubscriber: FavoriteSubscriber.getInstance(),
      })
      .then(async ({ uniqueResponse: favorites }: FavoriteArrayResponse) => {
        const postIds = favorites.map((favorite) => favorite.reflect.postId);
        return await this.#postRepository.findByIds(postIds);
      });
  }

  async getFavoriteAmount(postId: string): Promise<number> {
    return this.#publisher
      .publish({
        command: new GetPostFavoriteAmountCommand(postId),
        targetSubscriber: FavoriteSubscriber.getInstance(),
      })
      .then(({ uniqueResponse: amount }: AmountResponse) => amount);
  }

  async getCommentAmount(postId: string): Promise<number> {
    return this.#publisher
      .publish({
        command: new GetPostCommentAmountCommand(postId),
        targetSubscriber: CommentSubscriber.getInstance(),
      })
      .then(({ uniqueResponse: amount }: AmountResponse) => amount);
  }

  async findPostFavorite(favorite: Favorite): Promise<Favorite> {
    return this.#publisher
      .publish({
        command: new FindFavoriteCommand(favorite),
        targetSubscriber: FavoriteSubscriber.getInstance(),
      })
      .then(({ uniqueResponse: favorite }: FindFavoriteResponse) => favorite);
  }

  async publishDeletePost(postId: string): Promise<void> {
    await this.#publisher.publish({
      command: new DeletePostCommand(postId),
    });
  }
}
