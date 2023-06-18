import type { IUserReflectObject, IUserService } from "@typings/user";
import { User } from "@domain/aggregates/user";
import {
  ISessionTokenAdapter,
  ISendMailAdapter,
  IEncryptPasswordAdapter,
} from "../adapters";
import Validators from "../helpers/Validators";

type RegisterUserResult = { user: User; sessionToken: string };

export class UserUseCases {
  constructor(private userService: IUserService) {}

  async register(request: {
    user: IUserReflectObject;
    sessionTokenAdapter: ISessionTokenAdapter;
    encryptPasswordAdapter: IEncryptPasswordAdapter;
  }): Promise<RegisterUserResult> {
    const { user, sessionTokenAdapter, encryptPasswordAdapter } = request;
    const encryptedPassword = await encryptPasswordAdapter.encrypt(
      user.password
    );
    const userInstance = await this.userService.createUser({
      ...user,
      password: encryptedPassword,
    });
    const sessionToken = sessionTokenAdapter.createSessionToken({
      user_id: userInstance.reflect.id!,
      email: userInstance.reflect.email,
      type: userInstance.reflect.userRole,
      username: userInstance.reflect.username,
      avatarId: userInstance.reflect.avatar,
    });
    return { user: userInstance, sessionToken };
  }

  async verifyEmail(request: {
    email: string;
    sendMailAdapter: ISendMailAdapter;
  }): Promise<number> {
    const { email, sendMailAdapter } = request;
    const randomSixDigitCode = Math.floor(100000 + Math.random() * 900000);
    await sendMailAdapter.verifyEmail({ email, randomSixDigitCode });
    return randomSixDigitCode;
  }

  async getById(id: string): Promise<User | undefined> {
    return await this.userService.getUserById(id);
  }

  async getByUsername(username: string): Promise<User | undefined> {
    return await this.userService.getUserByUsername(username);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.userService.getUserByEmail(email);
  }

  async getManyByUsername(username: string): Promise<User[]> {
    return await this.userService.getUsersByUsername(username);
  }

  async update(updatedUser: IUserReflectObject): Promise<User | undefined> {
    return await this.userService.updateUser(updatedUser);
  }

  async signin(request: {
    identifier: string;
    password: string;
    sessionTokenAdapter: ISessionTokenAdapter;
    encryptPasswordAdapter: IEncryptPasswordAdapter;
  }): Promise<RegisterUserResult> {
    const {
      identifier,
      password,
      sessionTokenAdapter,
      encryptPasswordAdapter,
    } = request;
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
    const isValidPassword = await encryptPasswordAdapter.compare({
      plainPassword: password,
      hashedPassword: user.reflect.password,
    });
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const sessionToken = sessionTokenAdapter.createSessionToken({
      user_id: user.reflect.id!,
      email: user.reflect.email,
      username: user.reflect.username,
      avatarId: user.reflect.avatar,
      type: user.reflect.userRole,
    });
    return {
      user: user,
      sessionToken,
    };
  }
}
