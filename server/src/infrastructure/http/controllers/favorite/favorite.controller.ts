import { appInMemory } from "@infra/index";
import { FavoriteUseCases } from "@app/use-cases/FavoriteUseCases";
import { Body, Controller, Get, Put, Query } from "@nestjs/common";

@Controller("favorite")
export class FavoriteController {
  #favoriteUseCases: FavoriteUseCases;

  constructor() {
    this.#favoriteUseCases = appInMemory.getFavoriteUsesCases();
  }

  @Put()
  async toggle(
    @Body() favorite: { postId: string; userId: string },
  ): Promise<void> {
    await this.#favoriteUseCases.toggle(favorite);
  }

  @Get()
  async amount(
    @Query() query: { of: "post" | "user"; id: string },
  ): Promise<number> {
    const { of, id } = query;
    if (of === "post") {
      return await this.#favoriteUseCases.getPostAmount(id);
    } else if (of === "user") {
      return await this.#favoriteUseCases.getUserAmount(id);
    }
  }
}
