import { IUserReflectObject, User, UserService } from "@/domain/user";
import { CreateSessionTokenAdapter } from "../adapters/create-session-token";

type RegisterUserResult = { user: User; sessionToken: string };

export class UserUseCases {
  constructor(private userService: UserService) {}

  async register(request: {
    user: IUserReflectObject;
    createSessionTokenAdapter: CreateSessionTokenAdapter;
  }): Promise<RegisterUserResult> {
    const { user, createSessionTokenAdapter } = request;
    const userInstance = await this.userService.createUser(user);
    const sessionToken = createSessionTokenAdapter.createSessionToken({
      user_id: userInstance.reflect.id!,
      email: userInstance.reflect.email,
    });
    return { user: userInstance, sessionToken };
  }

  async find(request: {
    option: "email" | "id";
    by: string;
  }): Promise<User | undefined> {
    if (request.option === "email") {
      const user = await this.userService.getUserByEmail(request.by);
      return user;
    } else if (request.option === "id") {
      const user = await this.userService.getUserById(request.by);
      return user;
    } else {
      throw new Error("Invalid params!");
    }
  }
}
