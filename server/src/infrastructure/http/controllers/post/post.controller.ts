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
} from "@nestjs/common";
import { IPostReflectObject } from "@domain/src/post";
import { PostUseCases } from "@app/use-cases/PostUseCases";
import { appInMemory } from "@infra/index";
import { errorHandler } from "@infra/http/@utils/errorHandler";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";
import { VerifySessionTokenAdapter } from "@/application/adapters/VerifySessionToken";
import jwt from "jsonwebtoken";
import { IUserTokenInfo } from "@/application/adapters/@interfaces";

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
  async publishPost(
    @Body() post: IPostReflectObject,
    @Headers("authorization") authorization: string,
  ): Promise<IPostReflectObject> {
    try {
      const verifySessionTokenAdapter = new VerifySessionTokenAdapter(jwt);
      const decoded =
        verifySessionTokenAdapter.verifySessionToken(authorization);
      if (decoded.type === "reader") {
        throw new Error(
          "(reader) type users are not authorized to publish posts",
        );
      }
      return await this.#postUseCases
        .create(post)
        .then((post) => post?.reflect);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("search")
  async search(@Query() query: { by: "id" | "title"; value: string }): Promise<
    | {
        post: IPostReflectObject;
        favoriteAmount: number;
        commentAmount: number;
      }
    | IPostReflectObject
  > {
    try {
      const { by, value } = query;
      if (by === "id") {
        return await this.#postUseCases.getById(value).then(async (post) => {
          return {
            post: post?.reflect,
            favoriteAmount: await this.#favoriteController.amount({
              of: "post",
              id: post.reflect.id,
            }),
            commentAmount: await this.#commentController.amount({
              of: "post",
              id: post.reflect.id,
            }),
          };
        });
      } else if (by === "title") {
        return await this.#postUseCases
          .getByTitle(value)
          .then((post) => post?.reflect);
      }
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

  @Put("update")
  async edit(
    @Body() updatedPost: IPostReflectObject,
    @Headers("authorization") authorization: string,
  ): Promise<IPostReflectObject> {
    try {
      const verifySessionTokenAdapter = new VerifySessionTokenAdapter(jwt);
      const decoded =
        verifySessionTokenAdapter.verifySessionToken(authorization);
      if (decoded.type === "reader") {
        throw new Error(
          "(reader) type users are not authorized to publish posts",
        );
      }
      return await this.#postUseCases
        .update(updatedPost)
        .then((post) => post?.reflect);
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
