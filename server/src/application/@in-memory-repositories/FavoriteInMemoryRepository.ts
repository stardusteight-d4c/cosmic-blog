import { Favorite, IFavoriteRepository } from "@domain/src/favorite";

export class FavoriteInMemoryRepository implements IFavoriteRepository {
  private static instance: FavoriteInMemoryRepository;
  #favorites: Map<string, Favorite> = new Map();

  private constructor() {}

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

  public static getInstance(): FavoriteInMemoryRepository {
    if (!FavoriteInMemoryRepository.instance) {
      FavoriteInMemoryRepository.instance = new FavoriteInMemoryRepository();
    }
    return FavoriteInMemoryRepository.instance;
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

  public async findAll(): Promise<Favorite[]> {
    const favorites: Favorite[] = Array.from(this.#favorites.values());
    return favorites;
  }

  public async delete(favorite: Favorite): Promise<Favorite> {
    const key = this.generateKey(favorite);
    if (!this.#favorites.has(key)) {
      throw new Error("Favorite not exists");
    }
    this.#favorites.delete(key);
    return favorite;
  }

  public async deleteAll(): Promise<void> {
    this.#favorites.clear();
  }

  public async deleteAllByPostId(postId: string): Promise<void> {
    for (const [key, favorite] of this.#favorites.entries()) {
      if (favorite.reflect.postId === postId) {
        this.#favorites.delete(key);
      }
    }
  }

  public async deleteAllByUserId(userId: string): Promise<void> {
    for (const [key, favorite] of this.#favorites.entries()) {
      if (favorite.reflect.userId === userId) {
        this.#favorites.delete(key);
      }
    }
  }

  public async findAllByPostId(postId: string): Promise<Favorite[]> {
    const favorites: Favorite[] = [];
    for (const favorite of this.#favorites.values()) {
      if (favorite.postId === postId) {
        favorites.push(favorite);
      }
    }
    return favorites;
  }

  public async findAllByUserId(userId: string): Promise<Favorite[]> {
    const favorites: Favorite[] = [];
    for (const favorite of this.#favorites.values()) {
      if (favorite.userId === userId) {
        favorites.push(favorite);
      }
    }
    return favorites;
  }

  public get favorites() {
    throw new Error("Cannot access favorites property directly.");
  }
  public set favorites(_value: string) {
    throw new Error("Cannot modify favorites property directly.");
  }
}
