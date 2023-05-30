import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { appInMemory } from "@infra/index";
import { UserUseCases } from "@app/use-cases/UserUseCases";
import { IUserReflectObject, User } from "@domain/src/user";
import { CreateSessionTokenAdapter } from "@app/adapters/create-session-token";
import jwt from "jsonwebtoken";
import { errorHandler } from "../../@utils/errorHandler";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";

@Controller("user")
export class UserController {
  #userUseCases: UserUseCases;
  #favoriteController: FavoriteController;
  #commentController: CommentController;

  constructor(
    @Inject(FavoriteController)
    favoriteController: FavoriteController,
    @Inject(CommentController)
    commentController: CommentController,
  ) {
    this.#userUseCases = appInMemory.getUserUsesCases();
    this.#favoriteController = favoriteController;
    this.#commentController = commentController;
  }

  @Post("register")
  async register(
    @Body() user: IUserReflectObject,
  ): Promise<{ user: IUserReflectObject; sessionToken: string }> {
    try {
      const createSessionTokenAdapter = new CreateSessionTokenAdapter(jwt);
      return await this.#userUseCases
        .register({
          user,
          createSessionTokenAdapter,
        })
        .then(({ user, sessionToken }) => {
          return { user: user.reflect, sessionToken };
        });
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Get("search")
  async getUserBy(
    @Query() query: { where: "id" | "email"; equals: string },
  ): Promise<{
    user: IUserReflectObject;
    favoriteAmount: number;
    commentAmount: number;
  }> {
    try {
      const { where, equals } = query;
      if (where === "id") {
        return await this.#userUseCases
          .getBy({ option: "id", equals })
          .then(async (user) => {
            return {
              user: user?.reflect,
              favoriteAmount: await this.#favoriteController.amount({
                of: "user",
                id: user.reflect.id,
              }),
              commentAmount: await this.#commentController.amount({
                of: "user",
                id: user.reflect.id,
              }),
            };
          });
      } else if (where === "email") {
        return await this.#userUseCases
          .getBy({ option: "email", equals })
          .then(async (user) => {
            return {
              user: user?.reflect,
              favoriteAmount: await this.#favoriteController.amount({
                of: "user",
                id: user.reflect.id,
              }),
              commentAmount: await this.#commentController.amount({
                of: "user",
                id: user.reflect.id,
              }),
            };
          });
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }

  @Put("update")
  async edit(
    @Body() updatedUser: IUserReflectObject,
  ): Promise<IUserReflectObject> {
    try {
      return await this.#userUseCases
        .update(updatedUser)
        .then((user) => user?.reflect);
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
