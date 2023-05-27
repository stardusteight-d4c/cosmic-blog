import { IFavoriteService } from "@/domain/favorite";

export class FavoriteUseCases {
  constructor(private favoriteService: IFavoriteService) {}
}
