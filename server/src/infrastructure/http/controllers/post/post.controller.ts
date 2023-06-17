import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Inject,
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
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";
import { RequireAuthorPermission } from "../../guards/RequireAuthorPermission";
import { IGetPostResponse } from "./dtos";
import { getPostResponse } from "./dtos/getPostResponse";

@Controller("post")
export class PostController {
  #postUseCases: PostUseCases;
  #favoriteController: FavoriteController;
  #commentController: CommentController;

  constructor(
    @Inject(FavoriteController)
    favoriteController: FavoriteController,
    @Inject(CommentController)
    commentController: CommentController
  ) {
    this.#postUseCases = app.getPostUsesCases();
    this.#favoriteController = favoriteController;
    this.#commentController = commentController;
  }

  @Post("")
  @UseGuards(RequireAuthorPermission)
  public async publishPost(
    @Body() post: IPostReflectObject
  ): Promise<IPostReflectObject> {
    try {
      return this.#postUseCases.create(post).then((post) => post?.reflect);
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("")
  public async all(): Promise<IPostReflectObject[]> {
    try {
      return this.#postUseCases
        .getAll()
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get(":id")
  public async getById(
    @Param("id") id: string,
    @Headers("authorization") authorization: string
  ): Promise<IGetPostResponse> {
    try {
      return this.#postUseCases.getById(id).then(async (post) => {
        return await this.buildGetPostResponse({
          post: post.reflect,
          authToken: authorization,
        });
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("slug/:slug")
  public async getBySlug(
    @Param("slug") slug: string,
    @Headers("authorization") authorization: string
  ): Promise<IGetPostResponse> {
    try {
      return this.#postUseCases.getBySlug(slug).then(async (post) => {
        return await this.buildGetPostResponse({
          post: post.reflect,
          authToken: authorization,
        });
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("title")
  public async getManyByTitle(
    @Query("equals") equals: string
  ): Promise<IPostReflectObject[]> {
    try {
      return await this.#postUseCases
        .getManyByTitle(equals)
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("pagination")
  public async getWithPagination(
    @Query() query: { skip: number; pageSize: number }
  ): Promise<IPostReflectObject[]> {
    try {
      return this.#postUseCases
        .getWithPagination(query)
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("pagination/userFavorites")
  public async getWithPaginationByUserFavorites(
    @Query() query: { userId: string; skip: number; pageSize: number }
  ): Promise<IPostReflectObject[]> {
    try {
      return this.#postUseCases
        .getUserFavoritePostsWithPagination(query)
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Put("")
  @UseGuards(RequireAuthorPermission)
  public async edit(
    @Body() updatedPost: IPostReflectObject
  ): Promise<IPostReflectObject> {
    try {
      return this.#postUseCases
        .update(updatedPost)
        .then((post) => post?.reflect);
    } catch (error) {
      errorHandler(error);
    }
  }

  @Delete(":postId")
  @UseGuards(RequireAuthorPermission)
  public async delete(@Param("postId") postId: string): Promise<void> {
    try {
      this.#postUseCases.delete(postId);
    } catch (error) {
      errorHandler(error);
    }
  }

  public async getFavoriteAmount(postId: string): Promise<number> {
    return this.#favoriteController.amount({ of: "post", id: postId });
  }

  public async getCommentAmount(postId: string): Promise<number> {
    return this.#commentController.amount({ of: "post", id: postId });
  }

  public async isFavoritedByUser(request: {
    userId: string;
    postId: string;
  }): Promise<boolean> {
    return this.#favoriteController.isFavorited(request);
  }

  private async buildGetPostResponse(request: {
    post: IPostReflectObject;
    authToken: string;
  }): Promise<IGetPostResponse> {
    const { post, authToken } = request;
    return await getPostResponse({ controller: this, authToken, post });
  }
}
