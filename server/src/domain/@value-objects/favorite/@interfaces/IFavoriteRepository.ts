import { Favorite } from "../Favorite";

export interface IFavoriteRepository {
  create(favorite: Favorite): Promise<Favorite>;
  update(updatedFavorite: Favorite): Promise<Favorite>;
  get(): Promise<Favorite[]>;
  findFavoriteByKey(favoriteKey: string): Promise<Favorite | undefined>;
  delete(favorite: Favorite): Promise<Favorite>;
}