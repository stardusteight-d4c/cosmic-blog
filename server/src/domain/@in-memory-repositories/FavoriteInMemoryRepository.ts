import { IFavoriteRepository } from "../@value-objects/favorite/@interfaces/IFavoriteRepository";
import { Favorite } from "@domain/@value-objects/favorite";

export class FavoriteInMemoryRepository implements IFavoriteRepository {
  #favorites: Map<string, Favorite> = new Map();

  private generateKey(favorite: Favorite): string {
    return `${favorite.postId}-${favorite.userId}`;
  }

  private async replace(updatedFavorite: Favorite): Promise<Favorite> {
    const key = this.generateKey(updatedFavorite);
    const existingFavorite = await this.findFavoriteByKey(key);
    if (!existingFavorite) {
      throw new Error(`No favorite found`);
    }
    this.#favorites.delete(key);
    this.#favorites.set(key, updatedFavorite);
    return updatedFavorite;
  }

  public async create(favorite: Favorite): Promise<Favorite> {
    const key = this.generateKey(favorite);
    if (this.#favorites.has(key)) {
      throw new Error("Favorite already exists");
    }
    this.#favorites.set(key, favorite);
    return favorite;
  }

  public async findFavoriteByKey(
    favoriteKey: string,
  ): Promise<Favorite | undefined> {
    for (const favorite of this.#favorites.values()) {
      if (this.generateKey(favorite) === favoriteKey) {
        return favorite;
      }
    }
    return undefined;
  }

  public async update(updatedFavorite: Favorite): Promise<Favorite> {
    const favorite = await this.replace(updatedFavorite);
    return favorite;
  }

  public async get(): Promise<Favorite[]> {
    const favorites: Favorite[] = Array.from(this.#favorites.values());
    return favorites;
  }

  public async delete(favorite: Favorite): Promise<Favorite> {
    const key = this.generateKey(favorite);
    if (this.#favorites.has(key)) {
      this.#favorites.delete(key);
    } else {
      throw new Error("Favorite not exists");
    }
    return favorite;
  }

  public get favorites() {
    throw new Error("Cannot access favorites property directly.");
  }
  public set favorites(_value: string) {
    throw new Error("Cannot modify favorites property directly.");
  }
}
