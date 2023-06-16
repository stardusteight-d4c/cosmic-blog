import type {
  IFavoriteReflectObject,
  IFavoriteRepository,
  IFavoriteService,
} from "@typings/favorite";
import { Favorite } from ".";
import { ServiceHandlers, favoriteBuilderFactory } from "./helpers";

export class FavoriteService implements IFavoriteService {
  constructor(readonly favoriteRepository: IFavoriteRepository) {}

  public async toggleFavoritePost(
    favorite: IFavoriteReflectObject
  ): Promise<Favorite | undefined> {
    await ServiceHandlers.findPostIdOrThrowError(favorite.postId);
    await ServiceHandlers.findUserIdOrThrowError(favorite.userId);
    const newFavorite = favoriteBuilderFactory(favorite);
    const favorites = await this.favoriteRepository.findFavoriteByKey(
      `${newFavorite.reflect.postId}+${newFavorite.reflect.userId}`
    );
    if (favorites) {
      await this.favoriteRepository.delete(newFavorite);
    } else {
      await this.favoriteRepository.create(newFavorite);
    }
    return newFavorite;
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
    const favoriteKey = `${favorite.reflect.postId}+${favorite.reflect.userId}`;
    return await this.favoriteRepository.findFavoriteByKey(favoriteKey);
  }
}
