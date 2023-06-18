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
import Validators from "../../../../application/helpers/Validators";

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
    try {
      const sendMailAdapter = new NodemailerSendMailAdapter();
      return this.#userUseCases
        .verifyEmail({ email, sendMailAdapter })
        .then(async (code) => {
          return await bcrypt.hash(String(code), 10);
        });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get(":id")
  public async getById(
    @Param("id") id: string
  ): Promise<{ user: IGetUserResponse }> {
    try {
      return this.#userUseCases.getById(id).then((user) => {
        return user ? { user } : { user: {} as IGetUserResponse };
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("username/:username")
  public async findUsername(
    @Param("username") username: string
  ): Promise<{ user: IGetUserResponse }> {
    try {
      return this.#userUseCases.getByUsername(username).then((user) => {
        return user ? { user } : { user: {} as IGetUserResponse };
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("username")
  public async getManyByUsername(
    @Query("equals") equals: string
  ): Promise<IUserReflectObject[]> {
    try {
      return this.#userUseCases
        .getManyByUsername(equals)
        .then((users) => users.map((user) => user.reflect));
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("email/:email")
  public async findEmail(@Param("email") email: string): Promise<Boolean> {
    try {
      return this.#userUseCases.getByEmail(email).then((user) => {
        return user?.reflect ? true : false;
      });
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get("signin")
  public async signin(
    @Query() query: { identifier: string; password: string }
  ) {
    try {
      const { identifier, password } = query;
      const sessionTokenAdapter = new JWTSessionTokenAdapter();
      const encryptPasswordAdapter = new BcryptEncryptPasswordAdapter();
      return await this.#userUseCases
        .signin({
          identifier,
          password,
          sessionTokenAdapter,
          encryptPasswordAdapter,
        })
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
    @Headers("authorization") authorization: string
  ): Promise<IUserReflectObject> {
    try {
      Validators.isSameUser({
        sessionTokenAdapter: new JWTSessionTokenAdapter(),
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
}
