import { Favorite } from "@domain/src/favorite";

export interface IFavoriteReflectObject {
  userId: string;
  postId: string;
}

export interface IFavoriteService {
  toggleFavoritePost(request: {
    postId: string;
    userId: string;
  }): Promise<Favorite | undefined>;
  getAllFavoritesByPostId(postId: string): Promise<Favorite[]>;
  getFavorite(favorite: Favorite): Promise<Favorite>;
  getPostFavoriteAmount(postId: string): Promise<number>;
  getUserFavoriteAmount(userId: string): Promise<number>;
  deleteAllFavoritesByPostId(postId: string): Promise<void>;
  deleteAllFavoritesByUserId(userId: string): Promise<void>;
}

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
