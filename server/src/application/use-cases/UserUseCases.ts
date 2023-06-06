import { IUserReflectObject, IUserService, User } from "@domain/src/user";
import { SessionTokenAdapter } from "../adapters/SessionTokenAdapter";
import { SendMailAdapter } from "../adapters/SendMailAdapter";
import Validators from "@/infrastructure/http/@utils/validators";

type RegisterUserResult = { user: User; sessionToken: string };

export class UserUseCases {
  constructor(private userService: IUserService) {}

  async register(request: {
    user: IUserReflectObject;
    sessionTokenAdapter: SessionTokenAdapter;
  }): Promise<RegisterUserResult> {
    const { user, sessionTokenAdapter } = request;
    const userInstance = await this.userService.createUser(user);
    const sessionToken = sessionTokenAdapter.createSessionToken({
      user_id: userInstance.reflect.id!,
      email: userInstance.reflect.email,
      type: userInstance.reflect.userRole,
    });
    return { user: userInstance, sessionToken };
  }

  async verifyEmail(request: {
    email: string;
    sendMailAdapter: SendMailAdapter;
  }): Promise<number> {
    const { email, sendMailAdapter } = request;
    const randomSixDigitCode = Math.floor(100000 + Math.random() * 900000);
    await sendMailAdapter.verifyEmail({ email, randomSixDigitCode });
    return randomSixDigitCode;
  }

  async getById(id: string): Promise<User | undefined> {
    return await this.userService.getUserById(id);
  }

  async update(updatedUser: IUserReflectObject): Promise<User | undefined> {
    return await this.userService.updateUser(updatedUser);
  }

  async signin(request: {
    identifier: string;
    password: string;
    sessionTokenAdapter: SessionTokenAdapter;
  }): Promise<RegisterUserResult> {
    const { identifier, password, sessionTokenAdapter } = request;
    let user: User;
    if (Validators.isEmail(identifier)) {
      user = await this.userService.getUserByEmail(identifier);
      if (!user) {
        throw new Error("Email does not exist");
      }
    } else {
      user = await this.userService.getUserByUsername(identifier);
      if (!user) {
        throw new Error("Username does not exist");
      }
    }
    // encriptografar senha
    const isValidPassword = password === user.reflect.password;
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const sessionToken = sessionTokenAdapter.createSessionToken({
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
