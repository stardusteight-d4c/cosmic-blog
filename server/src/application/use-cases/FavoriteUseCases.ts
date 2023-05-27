import { IFavoriteService } from "@domain/src/favorite";

export class FavoriteUseCases {
  constructor(private favoriteService: IFavoriteService) {}

  async toggle(request: { postId: string; userId: string }) {
    await this.favoriteService.toggleFavoritePost(request);
  }

  async getAllByPostId(postId: string) {
    return await this.favoriteService.getAllFavoritesByPostId(postId);
  }

  async getPostAmount(postId: string) {
    return await this.favoriteService.getPostFavoriteAmount(postId);
  }

  async getUserAmount(userId: string) {
    return await this.favoriteService.getUserFavoriteAmount(userId);
  }
}
