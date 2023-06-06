import { Favorite } from "../Favorite";

export interface IFavoriteRepository {
  create(favorite: Favorite): Promise<Favorite>;
  update(updatedFavorite: Favorite): Promise<Favorite>;
  findAll(): Promise<Favorite[]>;
  findFavoriteByKey(favoriteKey: string): Promise<Favorite | undefined>;
  findAllByPostId(postId: string): Promise<Favorite[]>;
  findAllByUserId(userId: string): Promise<Favorite[]>;
  delete(favorite: Favorite): Promise<Favorite>;
  deleteAll(): Promise<void>;
  deleteAllByPostId(postId: string): Promise<void>;
  deleteAllByUserId(userId: string): Promise<void>;
}
