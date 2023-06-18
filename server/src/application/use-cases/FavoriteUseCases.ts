import type { IFavoriteService } from "@typings/favorite";
import { Favorite } from "@domain/aggregates/favorite";

export class FavoriteUseCases {
  constructor(private favoriteService: IFavoriteService) {}

  private async getUserAmount(userId: string) {
    return await this.favoriteService.getUserFavoriteAmount(userId);
  }

  private async getPostAmount(postId: string) {
    return await this.favoriteService.getPostFavoriteAmount(postId);
  }

  public async getAmount(request: IGetFavoriteAmountRequest) {
    const call =
      request.of === "post" ? this.getPostAmount : this.getUserAmount;
    return await call(request.id);
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
