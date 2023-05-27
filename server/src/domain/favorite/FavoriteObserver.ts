import { IFavoriteService } from ".";
import { ICommand, IObserver } from "../@interfaces";
import DeletePostCommand from "../post/PostCommands";
import DeleteUserCommand from "../user/UserCommands";

export class FavoriteObserver implements IObserver {
  watching: string[] = ["delete_post", "delete_user"];
  constructor(readonly favoriteService: IFavoriteService) {}

  async notifyService(command: ICommand) {
    if (command.operation === this.watching[0]) {
      const { postId } = command as DeletePostCommand;
      await this.favoriteService.deleteAllFavoritesByPostId(postId);
    }

    if (command.operation === this.watching[1]) {
      const { userId } = command as DeleteUserCommand;
      await this.favoriteService.deleteAllFavoritesByUserId(userId);
    }
  }
}
