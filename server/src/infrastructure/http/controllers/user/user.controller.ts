import bcrypt from "bcrypt";
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import {
  NodemailerSendMailAdapter,
  JWTSessionTokenAdapter,
  BcryptEncryptPasswordAdapter,
} from "@infra/adapters";
import type { IUserReflectObject } from "@typings/user";
import { app } from "@infra/index";
import { UserUseCases } from "@app/use-cases/UserUseCases";
import { errorHandler } from "../../helpers/errorHandler";

@Controller("user")
export class UserController {
  #userUseCases: UserUseCases;

  constructor() {
    this.#userUseCases = app.getUserUsesCases();
  }

  @Post("register")
  public async register(
    @Body() user: IUserReflectObject
  ): Promise<IRegisterResponse> {
    return this.#userUseCases
      .register({
        user,
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        encryptPasswordAdapter: new BcryptEncryptPasswordAdapter(),
      })
      .then((user) => user)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Post("verifyEmail/:email")
  public async verifyEmail(@Param("email") email: string) {
    return this.#userUseCases
      .verifyEmail({ email, sendMailAdapter: new NodemailerSendMailAdapter() })
      .then(async (code) => await bcrypt.hash(String(code), 10))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get(":id")
  public async getById(
    @Param("id") id: string
  ): Promise<{ user: IGetUserResponse }> {
    return this.#userUseCases
      .getById(id)
      .then((user) => {
        return user ? { user } : { user: {} as IGetUserResponse };
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("username/:username")
  public async findUsername(
    @Param("username") username: string
  ): Promise<{ user: IGetUserResponse }> {
    return this.#userUseCases
      .getByUsername(username)
      .then((user) => {
        return user ? { user } : { user: {} as IGetUserResponse };
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("username")
  public async getManyByUsername(
    @Query("equals") equals: string
  ): Promise<IUserReflectObject[]> {
    return this.#userUseCases
      .getManyByUsername(equals)
      .then((users) => users.map((user) => user.reflect))
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("email/:email")
  public async findEmail(@Param("email") email: string): Promise<Boolean> {
    return this.#userUseCases
      .getByEmail(email)
      .then((user) => {
        return user?.reflect ? true : false;
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Get("signin")
  public async signin(
    @Query() query: { identifier: string; password: string }
  ) {
    return this.#userUseCases
      .signin({
        ...query,
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        encryptPasswordAdapter: new BcryptEncryptPasswordAdapter(),
      })
      .then(({ user, sessionToken }) => {
        return { user: user.reflect, sessionToken };
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }

  @Put("")
  public async edit(
    @Body() updatedUser: IUserReflectObject,
    @Headers("authorization") authorization: string
  ): Promise<IUserReflectObject> {
    return this.#userUseCases
      .update(updatedUser, {
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
        authToken: authorization,
        userId: updatedUser.id,
      })
      .then((user) => user?.reflect)
      .catch((err) => {
        errorHandler(err);
        return null;
      });
  }
}
