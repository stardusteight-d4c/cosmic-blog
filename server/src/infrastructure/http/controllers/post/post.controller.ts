import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import type { IPostReflectObject } from "@typings/post";
import { PostUseCases } from "@app/use-cases/PostUseCases";
import { app } from "@infra/index";
import { errorHandler } from "@infra/http/helpers/errorHandler";
import { RequireAuthorPermission } from "../../guards/RequireAuthorPermission";
import { JWTSessionTokenAdapter } from "@/infrastructure/adapters";

@Controller("post")
export class PostController {
  #postUseCases: PostUseCases;

  constructor() {
    this.#postUseCases = app.getPostUsesCases();
  }

  @Post("")
  @UseGuards(RequireAuthorPermission)
  public async create(
    @Body() post: IPostReflectObject
  ): Promise<IPostReflectObject> {
    return this.#postUseCases
      .create(post)
      .then((post) => post?.reflect)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("")
  public async getAll(): Promise<IPostReflectObject[]> {
    return this.#postUseCases
      .getAll()
      .then((posts) => posts?.map((post) => post?.reflect))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get(":id")
  public async getById(
    @Param("id") id: string,
    @Headers("authorization") authorization: string
  ): Promise<IGetPostResponse> {
    return this.#postUseCases
      .getById(id, {
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
      })
      .then((post) => post)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("slug/:slug")
  public async getBySlug(
    @Param("slug") slug: string,
    @Headers("authorization") authorization: string
  ): Promise<IGetPostResponse> {
    return this.#postUseCases
      .getBySlug(slug, {
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
      })
      .then((post) => post)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("title")
  public async getManyByTitle(
    @Query("equals") equals: string
  ): Promise<IPostReflectObject[]> {
    return this.#postUseCases
      .getManyByTitle(equals)
      .then((posts) => posts?.map((post) => post?.reflect))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("pagination")
  public async getWithPagination(
    @Query() query: { skip: number; pageSize: number }
  ): Promise<IPostReflectObject[]> {
    return this.#postUseCases
      .getWithPagination(query)
      .then((posts) => posts?.map((post) => post?.reflect))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("pagination/userFavorites")
  public async getWithPaginationByUserFavorites(
    @Query() query: { userId: string; skip: number; pageSize: number }
  ): Promise<IPostReflectObject[]> {
    return this.#postUseCases
      .getUserFavoritePostsWithPagination(query)
      .then((posts) => posts?.map((post) => post?.reflect))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Put("")
  @UseGuards(RequireAuthorPermission)
  public async update(
    @Body() updatedPost: IPostReflectObject
  ): Promise<IPostReflectObject> {
    return this.#postUseCases
      .update(updatedPost)
      .then((post) => post?.reflect)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Delete(":postId")
  @UseGuards(RequireAuthorPermission)
  public async delete(@Param("postId") postId: string): Promise<void> {
    return this.#postUseCases.delete(postId).catch((err) => {
      errorHandler(err);
      return null;
    });
  }

  // public async getFavoriteAmount(postId: string): Promise<number> {
  //   return await this.#favoriteController.getAmount({ of: "post", id: postId });
  // }

  // public async getCommentAmount(postId: string): Promise<number> {
  //   return await this.#commentController.getAmount({ of: "post", id: postId });
  // }

  // public async isFavoritedByUser(request: {
  //   userId: string;
  //   postId: string;
  // }): Promise<boolean> {
  //   return await this.#favoriteController.isFavorited(request);
  // }
}
