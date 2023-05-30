import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { IPostReflectObject } from "@domain/src/post";
import { PostUseCases } from "@app/use-cases/PostUseCases";
import { appInMemory } from "@infra/index";
import { errorHandler } from "@infra/http/@utils/errorHandler";
import { FavoriteController } from "../favorite/favorite.controller";

@Controller("post")
export class PostController {
  #postUseCases: PostUseCases;
  #favoriteController: FavoriteController;

  constructor(
    @Inject(FavoriteController)
    favoriteController: FavoriteController,
  ) {
    this.#postUseCases = appInMemory.getPostUsesCases();
    this.#favoriteController = favoriteController;
  }

  @Post("create")
  async publishPost(
    @Body() post: IPostReflectObject,
  ): Promise<IPostReflectObject> {
    try {
      return await this.#postUseCases
        .create(post)
        .then((post) => post?.reflect);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("search")
  async search(
    @Query() query: { where: "id" | "title"; equals: string },
  ): Promise<
    { post: IPostReflectObject; favoriteAmount: number } | IPostReflectObject
  > {
    try {
      const { where, equals } = query;
      if (where === "id") {
        return await this.#postUseCases.getById(equals).then(async (post) => {
          return {
            post: post?.reflect,
            favoriteAmount: await this.#favoriteController.amount({
              of: "post",
              id: post.reflect.id,
            }),
          };
        });
      } else if (where === "title") {
        return await this.#postUseCases
          .getByTitle(equals)
          .then((post) => post?.reflect);
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Put("update")
  async edit(
    @Body() updatedPost: IPostReflectObject,
  ): Promise<IPostReflectObject> {
    try {
      return await this.#postUseCases
        .update(updatedPost)
        .then((post) => post?.reflect);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("pagination")
  async getWithPagination(
    @Query() query: { skip: number; pageSize: number },
  ): Promise<IPostReflectObject[]> {
    try {
      return await this.#postUseCases
        .getWithPagination(query)
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("")
  async all(): Promise<IPostReflectObject[]> {
    try {
      return await this.#postUseCases
        .getAll()
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Delete(":postId")
  async delete(@Param("postId") postId: string): Promise<void> {
    try {
      await this.#postUseCases.delete(postId);
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
