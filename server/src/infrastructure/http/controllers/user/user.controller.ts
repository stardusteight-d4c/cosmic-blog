import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { transporter } from "@infra/lib/nodemailer";
import { appPostgreSQL } from "@infra/index";
import { UserUseCases } from "@app/use-cases/UserUseCases";
import { SessionTokenAdapter } from "@app/adapters/SessionTokenAdapter";
import { IPluginSendMail } from "@app/adapters/@interfaces";
import { SendMailAdapter } from "@app/adapters/SendMailAdapter";
import { errorHandler } from "../../@utils/errorHandler";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";
import { IRegisterResponse, IUserResponse } from "./@dtos";
import Validators from "../../@utils/validators";
import { getByIdResponse } from "./@dtos/builders/getByIdResponse";
import { registerResponse } from "./@dtos/builders/registerResponse";
import type { IUserReflectObject } from "@typings/user";
import jwt from "jsonwebtoken";
import brcypt from "bcrypt";

@Controller("user")
export class UserController {
  #userUseCases: UserUseCases;
  #favoriteController: FavoriteController;
  #commentController: CommentController;
  sessionTokenAdapter: SessionTokenAdapter;

  constructor(
    @Inject(FavoriteController)
    favoriteController: FavoriteController,
    @Inject(CommentController)
    commentController: CommentController,
  ) {
    // this.#userUseCases = appInMemory.getUserUsesCases();
    this.#userUseCases = appPostgreSQL.getUserUsesCases()
    this.#favoriteController = favoriteController;
    this.#commentController = commentController;
    this.sessionTokenAdapter = new SessionTokenAdapter(jwt);
  }

  @Post("register")
  public async register(
    @Body() user: IUserReflectObject,
  ): Promise<IRegisterResponse> {
    try {
      const sessionTokenAdapter = this.sessionTokenAdapter;
      return this.#userUseCases
        .register({ user, sessionTokenAdapter })
        .then(({ user, sessionToken }) => {
          return this.buildRegisterResponse(user.reflect, sessionToken);
        });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Post("verifyEmail/:email")
  public async verifyEmail(@Param("email") email: string) {
    try {
      const sendMailAdapter = new SendMailAdapter(
        transporter as unknown as IPluginSendMail,
      );
      return this.#userUseCases
        .verifyEmail({ email, sendMailAdapter })
        .then(async (code) => {
          return await brcypt.hash(String(code), 10);
        });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get(":id")
  public async getById(
    @Param("id") id: string
  ): Promise<{ user: IUserResponse }> {
    try {
      return this.#userUseCases.getById(id).then(async (user) => {
        return await this.buildGetByIdResponse(user.reflect);
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("username")
  public async getManyByUsername(
    @Query("equals") equals: string,
  ): Promise<IUserReflectObject[]> {
    try {
      return this.#userUseCases
        .getManyByUsername(equals)
        .then((users) => users.map((user) => user.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("signin")
  public async signin(
    @Query() query: { identifier: string; password: string },
  ) {
    try {
      const { identifier, password } = query;
      const sessionTokenAdapter = this.sessionTokenAdapter;
      return await this.#userUseCases
        .signin({ identifier, password, sessionTokenAdapter })
        .then(({ user, sessionToken }) => {
          return { user: user.reflect, sessionToken };
        });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Put("")
  public async edit(
    @Body() updatedUser: IUserReflectObject,
    @Headers("authorization") authorization: string,
  ): Promise<IUserReflectObject> {
    try {
      Validators.isSameUser({
        controller: this,
        authToken: authorization,
        userId: updatedUser.id,
      });
      return await this.#userUseCases
        .update(updatedUser)
        .then((user) => user?.reflect);
    } catch (error) {
      errorHandler(error);
    }
  }

  public async getFavoriteAmount(userId: string): Promise<number> {
    return this.#favoriteController.amount({ of: "user", id: userId });
  }

  public async getCommentAmount(userId: string): Promise<number> {
    return this.#commentController.amount({ of: "user", id: userId });
  }

  private buildRegisterResponse(
    user: IUserReflectObject,
    sessionToken: string
  ): IRegisterResponse {
    return registerResponse({ user, sessionToken });
  }

  private async buildGetByIdResponse(
    user: IUserReflectObject,
  ): Promise<{ user: IUserResponse }> {
    return await getByIdResponse({ controller: this, user });
  }
}
