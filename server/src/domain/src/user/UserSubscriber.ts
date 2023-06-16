import type { IUserService } from "@typings/user";
import { FindByIdCommand } from "@domain/globalsCommands";

export class UserSubscriber implements ISubscriber {
  signing: string[] = ["find_by_id"];
  private static instance: UserSubscriber;
  private readonly userService: IUserService;

  private constructor(userService: IUserService) {
    this.userService = userService;
  }

  public static getInstance(userService?: IUserService): UserSubscriber {
    if (!UserSubscriber.instance) {
      if (!userService) {
        throw new Error(
          "UserService must be provided when creating the first instance of UserSubscriber"
        );
      }
      UserSubscriber.instance = new UserSubscriber(userService);
    }
    return UserSubscriber.instance;
  }

  async notifyService(command: ICommand) {
    if (command.operation === "find_by_id") {
      const { id } = command as FindByIdCommand;
      return await this.userService.getUserById(id);
    }
  }
}
