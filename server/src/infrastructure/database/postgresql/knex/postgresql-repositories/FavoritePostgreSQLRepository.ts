import type { IFavoriteRepository } from "@typings/favorite";
import { Favorite } from "@domain/aggregates/favorite";
import { knex } from "../config";

export class FavoritePostgreSQLRepository implements IFavoriteRepository {
  private static instance: FavoritePostgreSQLRepository;

  private constructor() {}

  private generateKey(favorite: Favorite): string {
    return `${favorite.reflect.postId}+${favorite.reflect.userId}`;
  }

  private async replace(updatedFavorite: Favorite): Promise<Favorite> {
    const [postId, userId] = this.generateKey(updatedFavorite).split("+");
    return knex("favorites")
      .where({ postId, userId })
      .update(updatedFavorite.reflect)
      .then(() => updatedFavorite)
      .catch((err) => {
        throw new Error(`error replacing favorite: ${err}`);
      });
  }

  public static getInstance(): FavoritePostgreSQLRepository {
    if (!FavoritePostgreSQLRepository.instance) {
      FavoritePostgreSQLRepository.instance =
        new FavoritePostgreSQLRepository();
    }
    return FavoritePostgreSQLRepository.instance;
  }

  public async create(favorite: Favorite): Promise<Favorite> {
    return knex("favorites")
      .insert({ ...favorite.reflect })
      .returning("*")
      .then(([favorite]) => new Favorite(favorite))
      .catch((err) => {
        throw new Error(`error creating favorite: ${err}`);
      });
  }

  public async update(updatedFavorite: Favorite): Promise<Favorite> {
    return this.replace(updatedFavorite)
      .then((favorite) => favorite)
      .catch((err) => {
        throw new Error(`error updating favorite: ${err}`);
      });
  }

  public async findAll(): Promise<Favorite[]> {
    return knex("favorites")
      .select("*")
      .then((favorites) => favorites.map((favorite) => new Favorite(favorite)))
      .catch((err) => {
        throw new Error(`error finding favorites: ${err}`);
      });
  }

  public async findFavoriteByKey(
    favoriteKey: string
  ): Promise<Favorite | undefined> {
    const [postId, userId] = favoriteKey.split("+");
    return knex("favorites")
      .where({ postId, userId })
      .first()
      .then((favorite) => (favorite ? new Favorite(favorite) : undefined))
      .catch((err) => {
        throw new Error(`error finding favorite by key: ${err}`);
      });
  }

  public async findAllByPostId(postId: string): Promise<Favorite[]> {
    return knex("favorites")
      .where({ postId })
      .select("*")
      .then((favorites) => favorites.map((favorite) => new Favorite(favorite)))
      .catch((err) => {
        throw new Error(`error finding all favorites by post id: ${err}`);
      });
  }

  public async findAllByUserId(userId: string): Promise<Favorite[]> {
    return knex("favorites")
      .where({ userId })
      .select("*")
      .orderBy("created_at", "desc")
      .then((favorites) =>
        favorites ? favorites.map((favorite) => new Favorite(favorite)) : []
      )
      .catch((err) => {
        throw new Error(`error finding all favorites by user id: ${err}`);
      });
  }

  public async delete(favorite: Favorite): Promise<void> {
    const [postId, userId] = this.generateKey(favorite).split("+");
    await knex("favorites")
      .where({
        postId,
        userId,
      })
      .del()
      .catch((err) => {
        throw new Error(`error deleting favorite: ${err}`);
      });
  }

  public async deleteAll(): Promise<void> {
    await knex("favorites")
      .del()
      .catch((err) => {
        throw new Error(`error deleting all favorites: ${err}`);
      });
  }

  public async deleteAllByPostId(postId: string): Promise<void> {
    await knex("favorites")
      .where({ postId })
      .del()
      .catch((err) => {
        throw new Error(`error deleting favorites by post id: ${err}`);
      });
  }

  public async deleteAllByUserId(userId: string): Promise<void> {
    await knex("favorites")
      .where({ userId })
      .del()
      .catch((err) => {
        throw new Error(`error deleting favorites by user id: ${err}`);
      });
  }
}
