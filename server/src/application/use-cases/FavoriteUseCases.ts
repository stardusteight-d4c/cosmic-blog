import type { IFavoriteService } from "@typings/favorite";
import { Favorite } from "@domain/aggregates/favorite";

export class FavoriteUseCases {
  constructor(readonly favoriteService: IFavoriteService) {}

  private async getUserAmount(userId: string) {
    return await this.favoriteService.getUserFavoriteAmount(userId);
  }

  private async getPostAmount(postId: string) {
    return await this.favoriteService.getPostFavoriteAmount(postId);
  }

  public async getAmount(request: { of: "post" | "user"; id: string }) {
    const call = request.of === "post" ? "getPostAmount" : "getUserAmount";
    return await this[call](request.id);
  }

  public async toggle(request: { postId: string; userId: string }) {
    await this.favoriteService.toggleFavoritePost(request);
  }

  public async getAllByPostId(postId: string) {
    return await this.favoriteService.getAllFavoritesByPostId(postId);
  }

  public async getFavorite(favorite: Favorite) {
    return await this.favoriteService.getFavorite(favorite);
  }
}
