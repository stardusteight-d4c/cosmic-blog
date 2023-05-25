import { Favorite } from "..";

export interface IFavoriteService {
  emitToggleFavoritePostEvent(request: {
    postId: string;
    userId: string;
  }): Promise<Favorite | undefined>;
}
