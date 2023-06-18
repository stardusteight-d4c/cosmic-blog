import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { Favorite } from "@domain/aggregates/favorite";
import { FavoriteUseCases } from "@app/use-cases/FavoriteUseCases";
import { app } from "@infra/index";
import { errorHandler } from "../../helpers/errorHandler";

@Controller("favorite")
export class FavoriteController {
  #favoriteUseCases: FavoriteUseCases;

  constructor() {
    this.#favoriteUseCases = app.getFavoriteUsesCases();
  }

  @Get("amount")
  public async getAmount(
    @Query() query: { of: "post" | "user"; id: string }
  ): Promise<number> {
    return this.#favoriteUseCases
      .getAmount(query)
      .then((amount) => amount)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Put("toggle")
  public async toggle(
    @Body() favorite: { postId: string; userId: string }
  ): Promise<void> {
    return this.#favoriteUseCases.toggle(favorite).catch((err) => {
      errorHandler(err);
      return null;
    });
  }

  public async isFavorited(request: {
    userId: string;
    postId: string;
  }): Promise<boolean> {
    return this.#favoriteUseCases
      .getFavorite(new Favorite(request))
      .then((favorite) => (favorite ? true : false))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }
}
