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
import { appInMemory } from "@infra/index";
import { UserUseCases } from "@app/use-cases/UserUseCases";
import { IUserReflectObject } from "@domain/src/user";
import { errorHandler } from "../../@utils/errorHandler";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";
import jwt from "jsonwebtoken";
import { SessionTokenAdapter } from "@/application/adapters/SessionTokenAdapter";
import { transporter } from "@/infrastructure/lib/nodemailer";
import { SendMailAdapter } from "@/application/adapters/SendMailAdapter";
import brcypt from "bcrypt";
import { IPluginSendMail } from "@/application/adapters/@interfaces";
import { GetByIdResponse, RegisterResponse } from "./@dtos";
import { buildGetByIdResponse } from "./@dtos/buildGetByIdResponse";
import Validators from "../../@utils/validators";

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
    this.#userUseCases = appInMemory.getUserUsesCases();
    this.#favoriteController = favoriteController;
    this.#commentController = commentController;
    this.sessionTokenAdapter = new SessionTokenAdapter(jwt);
  }

  @Post("register")
  public async register(
    @Body() user: IUserReflectObject,
  ): Promise<RegisterResponse> {
    try {
      const sessionTokenAdapter = this.sessionTokenAdapter;
      return this.#userUseCases
        .register({ user, sessionTokenAdapter })
        .then(({ user, sessionToken }) => {
          return { user: user.reflect, sessionToken };
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
  public async getById(@Param("id") id: string): Promise<GetByIdResponse> {
    try {
      return this.#userUseCases.getById(id).then(async (user) => {
        return await this.buildResponse(user.reflect);
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

  @Put("update")
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

  private async buildResponse(
    user: IUserReflectObject,
  ): Promise<GetByIdResponse> {
    return await buildGetByIdResponse({ controller: this, user });
  }
}
