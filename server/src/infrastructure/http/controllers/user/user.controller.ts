import { Body, Controller, Post } from "@nestjs/common";
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
      const response = await this.#userUseCases.register({
        user,
        createSessionTokenAdapter,
      });
      return {
        user: response.user.reflect,
        sessionToken: response.sessionToken,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }
}
