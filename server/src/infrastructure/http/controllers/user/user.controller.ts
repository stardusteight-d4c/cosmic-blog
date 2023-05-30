import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { appInMemory } from "@infra/index";
import { UserUseCases } from "@app/use-cases/UserUseCases";
import { IUserReflectObject } from "@domain/src/user";
import { errorHandler } from "../../@utils/errorHandler";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";
import { CreateSessionTokenAdapter } from "@/application/adapters/CreateSessionToken";
import jwt from "jsonwebtoken";
import { VerifySessionTokenAdapter } from "@/application/adapters/VerifySessionToken";
import { IUserTokenInfo } from "@/application/adapters/@interfaces";

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
    @Query() query: { by: "id" | "email"; value: string },
  ): Promise<{
    user: IUserReflectObject;
    favoriteAmount: number;
    commentAmount: number;
  }> {
    try {
      if (query.by === "id") {
        return await this.#userUseCases.getBy(query).then(async (user) => {
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
      } else if (query.by === "email") {
        return await this.#userUseCases.getBy(query).then(async (user) => {
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

  @Get("signin")
  async signin(@Query() query: { email: string; password: string }) {
    try {
      const { email, password } = query;
      const createSessionTokenAdapter = new CreateSessionTokenAdapter(jwt);
      return await this.#userUseCases
        .signin({
          email,
          password,
          createSessionTokenAdapter,
        })
        .then(({ user, sessionToken }) => {
          return {
            user: user.reflect,
            sessionToken,
          };
        });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Put("update")
  async edit(
    @Body() updatedUser: IUserReflectObject,
    @Headers("authorization") authorization: string,
  ): Promise<IUserReflectObject> {
    try {
      const verifySessionTokenAdapter = new VerifySessionTokenAdapter(jwt);
      const decoded =
        verifySessionTokenAdapter.verifySessionToken(authorization);
      if (decoded.user_id === updatedUser.id) {
        throw new Error(
          "the session user is different from the user being updated",
        );
      }
      return await this.#userUseCases
        .update(updatedUser)
        .then((user) => user?.reflect);
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
