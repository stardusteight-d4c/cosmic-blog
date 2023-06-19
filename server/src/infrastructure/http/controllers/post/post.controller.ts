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
import { JWTSessionTokenAdapter } from "@infra/adapters";
import { PostUseCases } from "@app/use-cases/PostUseCases";
import { app } from "@infra/index";
import { errorHandler } from "@infra/http/helpers/errorHandler";
import { RequireAuthorPermission } from "../../guards/RequireAuthorPermission";

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

  @Get("pagination/filteringTags")
  public async getWithPaginationFilteringTags(
    @Query() query: { tag: string; skip: number; pageSize: number }
  ): Promise<IPostReflectObject[]> {
    return this.#postUseCases
      .getPostsByTag(query)
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
}
