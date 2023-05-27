import {
  ISocialLinks,
  IUserReflectObject,
  IUserService,
  User,
} from "@/domain/user";
import { CreateSessionTokenAdapter } from "../adapters/create-session-token";

type RegisterUserResult = { user: User; sessionToken: string };

export class UserUseCases {
  constructor(private userService: IUserService) {}

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

  async getUserBy(request: {
    option: "email" | "id";
    info: string;
  }): Promise<User | undefined> {
    if (request.option === "email") {
      const user = await this.userService.getUserByEmail(request.info);
      return user;
    } else if (request.option === "id") {
      const user = await this.userService.getUserById(request.info);
      return user;
    } else {
      throw new Error("Invalid params!");
    }
  }

  async changeSocialLinks({
    userId,
    socialLinks,
  }: {
    userId: string;
    socialLinks: ISocialLinks;
  }) {
    await this.userService.changeSocialLinks({
      userId,
      socialLinks,
    });
  }
}
