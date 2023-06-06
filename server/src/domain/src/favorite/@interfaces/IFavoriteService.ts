import { Favorite } from "..";

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
