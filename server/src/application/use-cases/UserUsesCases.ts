import { IUserReflectObject, User, UserService } from "@/domain/user";
import CreateSessionTokenAdapter from "../adapters/create-session-token";

type RegisterUserResult = { user: User; sessionToken: string };

export default class UserUsesCases {
  constructor(private userService: UserService) {}

  async registerUser(
    request: IUserReflectObject,
    createSessionTokenAdapter: CreateSessionTokenAdapter,
  ): Promise<RegisterUserResult> {
    const user = await this.userService.createUser(request);
    const sessionToken = createSessionTokenAdapter.createSessionToken({
      user_id: user.reflect.id!,
      email: user.reflect.email,
    });
    return { user, sessionToken };
  }
}
