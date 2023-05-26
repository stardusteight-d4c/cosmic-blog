import { Favorite } from "..";

export interface IFavoriteService {
  toggleFavoritePost(request: {
    postId: string;
    userId: string;
  }): Promise<Favorite | undefined>;
  getPostFavoriteAmount(postId: string): Promise<number>;
  getUserFavorites(userId: string): Promise<number>;
}
