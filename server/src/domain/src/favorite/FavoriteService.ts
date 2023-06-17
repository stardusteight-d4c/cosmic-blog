import { Publisher } from "@domain/Publisher";
import type {
  IFavoriteReflectObject,
  IFavoriteRepository,
  IFavoriteService,
} from "@typings/favorite";
import { Favorite } from ".";
import { favoriteBuilderFactory } from "./helpers";
import { FavoriteHandler } from "./FavoriteHandler";

export class FavoriteService implements IFavoriteService {
  #handler: FavoriteHandler;

  constructor(readonly favoriteRepository: IFavoriteRepository) {
    const publisher = Publisher.getInstance();
    this.#handler = new FavoriteHandler({ favoriteRepository, publisher });
  }

  private getFavoriteKey(favorite: Favorite) {
    return `${favorite.reflect.postId}+${favorite.reflect.userId}`;
  }

  private async toggle(favorite: Favorite) {
    return this.#handler
      .findFavoriteByKey(this.getFavoriteKey(favorite))
      .then(async (existingFavorite) => {
        if (existingFavorite) {
          await this.favoriteRepository.delete(favorite);
        } else {
          await this.favoriteRepository.create(favorite);
        }
        return favorite;
      });
  }

  public async toggleFavoritePost(
    favorite: IFavoriteReflectObject
  ): Promise<Favorite | undefined> {
    await this.#handler.findPostIdOrThrowError(favorite.postId);
    await this.#handler.findUserIdOrThrowError(favorite.userId);
    return await this.toggle(favoriteBuilderFactory(favorite));
  }

  public async deleteAllFavoritesByPostId(postId: string): Promise<void> {
    return await this.favoriteRepository.deleteAllByPostId(postId);
  }

  public async deleteAllFavoritesByUserId(userId: string): Promise<void> {
    return await this.favoriteRepository.deleteAllByUserId(userId);
  }

  public async getPostFavoriteAmount(postId: string): Promise<number> {
    return (await this.favoriteRepository.findAllByPostId(postId)).length;
  }

  public async getUserFavoriteAmount(userId: string): Promise<number> {
    return (await this.favoriteRepository.findAllByUserId(userId)).length;
  }

  public async getAllFavoritesByPostId(postId: string): Promise<Favorite[]> {
    return await this.favoriteRepository.findAllByPostId(postId);
  }

  public async getAllFavoritesByUserId(userId: string): Promise<Favorite[]> {
    return await this.favoriteRepository.findAllByUserId(userId);
  }

  public async getFavorite(favorite: Favorite): Promise<Favorite> {
    const key = this.getFavoriteKey(favorite);
    return await this.favoriteRepository.findFavoriteByKey(key);
  }
}
