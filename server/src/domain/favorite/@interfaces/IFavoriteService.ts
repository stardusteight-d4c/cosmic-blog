import { Favorite } from "..";

export interface IFavoriteService {
  toggleFavoritePost(request: {
    postId: string;
    userId: string;
  }): Promise<Favorite | undefined>;
  getFavoriteAmountFromPost(postId: string): Promise<number>
}
