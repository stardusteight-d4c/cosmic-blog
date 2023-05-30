import { IUserReflectObject, IUserService, User } from "@domain/src/user";
import { CreateSessionTokenAdapter } from "../adapters/CreateSessionToken";

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
      type: userInstance.reflect.userRole,
    });
    return { user: userInstance, sessionToken };
  }

  async getBy(request: {
    by: "email" | "id";
    value: string;
  }): Promise<User | undefined> {
    if (request.by === "email") {
      const user = await this.userService.getUserByEmail(request.value);
      return user;
    } else if (request.by === "id") {
      const user = await this.userService.getUserById(request.value);
      return user;
    }
    throw new Error("Invalid params");
  }

  async update(updatedUser: IUserReflectObject): Promise<User | undefined> {
    return await this.userService.updateUser(updatedUser);
  }

  async signin(request: {
    email: string;
    password: string;
    createSessionTokenAdapter: CreateSessionTokenAdapter;
  }): Promise<RegisterUserResult> {
    const { email, password, createSessionTokenAdapter } = request;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new Error("Email does not exist");
    }
    const isValidPassword = password === user.reflect.password;
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const sessionToken = createSessionTokenAdapter.createSessionToken({
      user_id: user.reflect.id!,
      email: user.reflect.email,
      type: user.reflect.userRole,
    });
    return {
      user: user,
      sessionToken,
    };
  }
}
