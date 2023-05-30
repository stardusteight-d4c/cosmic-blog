import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { appInMemory } from "@infra/index";
import { UserUseCases } from "@app/use-cases/UserUseCases";
import { IUserReflectObject, User } from "@domain/src/user";
import { CreateSessionTokenAdapter } from "@app/adapters/create-session-token";
import jwt from "jsonwebtoken";
import { errorHandler } from "../../@utils/errorHandler";

@Controller("user")
export class UserController {
  #userUseCases: UserUseCases;

  constructor() {
    this.#userUseCases = appInMemory.getUserUsesCases();
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
    @Query() request: { by: "id" | "email"; field: string },
  ): Promise<IUserReflectObject> {
    try {
      const { by, field } = request;
      if (by === "id") {
        return await this.#userUseCases
          .getBy({ option: "id", info: field })
          .then((user) => user?.reflect);
      } else if (by === "email") {
        return await this.#userUseCases
          .getBy({ option: "email", info: field })
          .then((user) => user?.reflect);
      }
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
