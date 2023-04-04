import { IUserReflectObject, User, UserService } from "@/domain/user";

export class RegisterUser {
  constructor(private userService: UserService) {}
  async execute(request: IUserReflectObject): Promise<User> {
    const user = await this.userService.createUser(request);
    return user;
  }
}
