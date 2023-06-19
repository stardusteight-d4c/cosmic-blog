import type { IUserReflectObject, IUserService } from "@typings/user";
import { User } from "@domain/aggregates/user";
import type {
  ISessionTokenAdapter,
  ISendMailAdapter,
  IEncryptPasswordAdapter,
} from "../adapters";
import Validators from "../helpers/Validators";

type RegisterUserResult = { user: User; sessionToken: string };

export class UserUseCases {
  constructor(readonly userService: IUserService) {}

  private generateRandomSixDigitCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  public async register(request: {
    user: IUserReflectObject;
    sessionTokenAdapter: ISessionTokenAdapter;
    encryptPasswordAdapter: IEncryptPasswordAdapter;
  }): Promise<IRegisterResponse> {
    return this.userService
      .createUser({
        ...request.user,
        password: await request.encryptPasswordAdapter.encrypt(
          request.user.password
        ),
      })
      .then((user) =>
        Validators.getSessionData(user, request.sessionTokenAdapter)
      );
  }

  public async verifyEmail(request: {
    email: string;
    sendMailAdapter: ISendMailAdapter;
  }): Promise<number> {
    const randomSixDigitCode = this.generateRandomSixDigitCode();
    return request.sendMailAdapter
      .verifyEmail({
        email: request.email,
        randomSixDigitCode,
      })
      .then(() => randomSixDigitCode);
  }

  public async getById(id: string): Promise<IGetUserResponse> {
    return this.userService
      .getUserById(id)
      .then(async (user) =>
        Validators.buildGetUserResponse(user, this.userService)
      );
  }

  public async getByUsername(username: string): Promise<IGetUserResponse> {
    return this.userService
      .getUserByUsername(username)
      .then(async (user) =>
        Validators.buildGetUserResponse(user, this.userService)
      );
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    return await this.userService.getUserByEmail(email);
  }

  public async getManyByUsername(username: string): Promise<User[]> {
    return await this.userService.getUsersByUsername(username);
  }

  public async update(
    updatedUser: IUserReflectObject,
    validation: {
      sessionTokenAdapter: ISessionTokenAdapter;
      authToken: string;
      userId: string;
    }
  ): Promise<User | undefined> {
    Validators.isSameUser(validation);
    return await this.userService.updateUser(updatedUser);
  }

  public async signin(request: {
    identifier: string;
    password: string;
    sessionTokenAdapter: ISessionTokenAdapter;
    encryptPasswordAdapter: IEncryptPasswordAdapter;
  }): Promise<RegisterUserResult> {
    return Validators.buildSigninResponse({
      ...request,
      service: this.userService,
    }).then((response) => response);
  }
}
