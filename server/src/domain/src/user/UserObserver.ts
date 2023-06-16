import type { IUserService } from "@typings/user";
import FindByIdCommand from "@domain/GlobalsCommand";

export class UserObserver implements IObserver {
  watching: string[] = ["find_by_id"];
  private static instance: UserObserver;
  private readonly userService: IUserService;

  private constructor(userService: IUserService) {
    this.userService = userService;
  }

  public static getInstance(userService?: IUserService): UserObserver {
    if (!UserObserver.instance) {
      if (!userService) {
        throw new Error(
          "UserService must be provided when creating the first instance of UserObserver"
        );
      }
      UserObserver.instance = new UserObserver(userService);
    }
    return UserObserver.instance;
  }

  async notifyService(command: ICommand) {
    if (command.operation === "find_by_id") {
      const { id } = command as FindByIdCommand;
      return await this.userService.getUserById(id);
    }
  }
}
