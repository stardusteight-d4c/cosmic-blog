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
import { IPostReflectObject } from "@domain/src/post";
import { PostUseCases } from "@app/use-cases/PostUseCases";
import { appInMemory } from "@infra/index";
import { errorHandler } from "@infra/http/@utils/errorHandler";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";
import { RequireAuthorPermission } from "../../@guards/RequireAuthorPermission";
import { GetByIdResponse } from "./@dtos";
import { buildGetByIdResponse } from "./@dtos/buildGetByIdResponse";

@Controller("post")
export class PostController {
  #postUseCases: PostUseCases;
  #favoriteController: FavoriteController;
  #commentController: CommentController;

  constructor(
    @Inject(FavoriteController)
    favoriteController: FavoriteController,
    @Inject(CommentController)
    commentController: CommentController,
  ) {
    this.#postUseCases = appInMemory.getPostUsesCases();
    this.#favoriteController = favoriteController;
    this.#commentController = commentController;
  }

  @Post("")
  @UseGuards(RequireAuthorPermission)
  public async publishPost(
    @Body() post: IPostReflectObject,
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
    @Headers("authorization") authorization: string,
  ): Promise<GetByIdResponse> {
    try {
      return this.#postUseCases.getById(id).then(async (post) => {
        return await this.buildResponse({
          post: post.reflect,
          authToken: authorization,
        });
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("pagination")
  public async getWithPagination(
    @Query() query: { skip: number; pageSize: number },
  ): Promise<IPostReflectObject[]> {
    try {
      return this.#postUseCases
        .getWithPagination(query)
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("pagination/byUserFavorites")
  public async getWithPaginationByUserFavorites(
    @Query() query: { userId: string; skip: number; pageSize: number },
  ): Promise<IPostReflectObject[]> {
    try {
      return this.#postUseCases
        .getUserFavoritePostsWithPagination(query)
        .then((posts) => posts?.map((post) => post?.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Put("update")
  @UseGuards(RequireAuthorPermission)
  public async edit(
    @Body() updatedPost: IPostReflectObject,
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

  // Method Overriding
  private async buildResponse(request: {
    post: IPostReflectObject;
    authToken: string;
  }): Promise<GetByIdResponse> {
    const { post, authToken } = request;
    return await buildGetByIdResponse({ controller: this, authToken, post });
  }
}
