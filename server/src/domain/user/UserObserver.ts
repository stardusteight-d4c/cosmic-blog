import { UserService } from ".";
import { FavoritePostCommand } from "@domain/post";
import { ICommand, IObserver } from "@domain/@interfaces";

export default class UserObserver implements IObserver {
  operations: string[] = ["favorite_post_command"];
  constructor(readonly userService: UserService) {}

  async notifyService(command: ICommand): Promise<any> {
    if (command.operation === "favorite_post_command") {
      const response = await this.userService.handlerFavoritePostCommand(
        command as FavoritePostCommand,
      );
      return response;
    }
  }
}
