import type { IFavoriteRepository } from "@typings/favorite";
import { Favorite } from "@domain/src/favorite";
import { knex } from "../config";

export class FavoritePostgreSQLRepository implements IFavoriteRepository {
  private static instance: FavoritePostgreSQLRepository;

  private constructor() { }

  private generateKey(favorite: Favorite): string {
    return `${favorite.reflect.postId}-${favorite.reflect.userId}`;
  }

  private async replace(updatedFavorite: Favorite): Promise<Favorite> {
    const key = this.generateKey(updatedFavorite);
    try {
      const [postId, userId] = key.split('-');
      const existingFavorite = await knex('favorites')
        .where({ postId, userId })
        .first();
      if (!existingFavorite) {
        throw new Error(`No favorite found with key: ${key}`);
      }
      await knex('favorites')
        .where({ postId, userId })
        .update(updatedFavorite.reflect);
      return updatedFavorite;
    } catch (error) {
      throw new Error(`Error replacing favorite: ${error}`);
    }
  }

  public static getInstance(): FavoritePostgreSQLRepository {
    if (!FavoritePostgreSQLRepository.instance) {
      FavoritePostgreSQLRepository.instance = new FavoritePostgreSQLRepository();
    }
    return FavoritePostgreSQLRepository.instance;
  }

  public async create(favorite: Favorite): Promise<Favorite> {
    const key = this.generateKey(favorite);
    try {
      const [postId, userId] = key.split('-');
      const existingFavorite = await knex('favorites')
        .where({ postId, userId })
        .first();
      if (existingFavorite) {
        throw new Error("Favorite already exists");
      }
      await knex('favorites')
        .insert(favorite);
      return favorite;
    } catch (error) {
      throw new Error(`Error creating favorite: ${error}`);
    }
  }

  public async update(updatedFavorite: Favorite): Promise<Favorite> {
    const favorite = await this.replace(updatedFavorite);
    return favorite;
  }

  public async findAll(): Promise<Favorite[]> {
    try {
      const favorites = await knex('favorites').select('*');
      return favorites.map((favorite) => new Favorite(favorite));
    } catch (error) {
      throw new Error(`Error finding favorites: ${error}`);
    }
  }

  public async findFavoriteByKey(favoriteKey: string): Promise<Favorite | undefined> {
    try {
      const [postId, userId] = favoriteKey.split('-');
      const favorite = await knex('favorites')
        .where({ postId, userId })
        .first();
      return favorite ? new Favorite(favorite) : undefined;
    } catch (error) {
      throw new Error(`Error finding favorite by key: ${error}`);
    }
  }

  public async findAllByPostId(postId: string): Promise<Favorite[]> {
    try {
      const favorites = await knex('favorites').where({ postId }).select('*');
      return favorites.map((favorite) => new Favorite(favorite));
    } catch (error) {
      throw new Error(`Error finding favorites by post ID: ${error}`);
    }
  }
  
  public async findAllByUserId(userId: string): Promise<Favorite[]> {
    try {
      const favorites = await knex('favorites').where({ userId }).select('*');
      return favorites.map((favorite) => new Favorite(favorite));
    } catch (error) {
      throw new Error(`Error finding favorites by user ID: ${error}`);
    }
  }
  
  public async delete(favorite: Favorite): Promise<Favorite> {
    const key = this.generateKey(favorite);
    const existingFavorite = await this.findFavoriteByKey(key);
    if (!existingFavorite) {
      throw new Error("Favorite not found");
    }
    try {
      await knex('favorites').where({ postId: favorite.postId, userId: favorite.userId }).del();
      return existingFavorite;
    } catch (error) {
      throw new Error(`Error deleting favorite: ${error}`);
    }
  }
  
  public async deleteAll(): Promise<void> {
    try {
      await knex('favorites').del();
    } catch (error) {
      throw new Error(`Error deleting all favorites: ${error}`);
    }
  }
  
  public async deleteAllByPostId(postId: string): Promise<void> {
    try {
      await knex('favorites').where({ postId }).del();
    } catch (error) {
      throw new Error(`Error deleting favorites by post ID: ${error}`);
    }
  }
  
  public async deleteAllByUserId(userId: string): Promise<void> {
    try {
      await knex('favorites').where({ userId }).del();
    } catch (error) {
      throw new Error(`Error deleting favorites by user ID: ${error}`);
    }
  }
}
