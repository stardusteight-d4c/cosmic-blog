import { appInMemory } from "@infra/index";
import { FavoriteUseCases } from "@app/use-cases/FavoriteUseCases";
import { Body, Controller, Get, Put, Query } from "@nestjs/common";
import { errorHandler } from "../../@utils/errorHandler";

@Controller("favorite")
export class FavoriteController {
  #favoriteUseCases: FavoriteUseCases;

  constructor() {
    this.#favoriteUseCases = appInMemory.getFavoriteUsesCases();
  }

  @Get()
  async amount(
    @Query() query: { of: "post" | "user"; id: string },
  ): Promise<number> {
    try {
      const { of, id } = query;
      if (of === "post") {
        return await this.#favoriteUseCases.getPostAmount(id);
      } else if (of === "user") {
        return await this.#favoriteUseCases.getUserAmount(id);
      }
    } catch (error) {
      errorHandler(error);
    }
  }

  @Put('toggle')
  async toggle(
    @Body() favorite: { postId: string; userId: string },
  ): Promise<void> {
    try {
      await this.#favoriteUseCases.toggle(favorite);
    } catch (error) {
      errorHandler(error);
    }
  }
}
