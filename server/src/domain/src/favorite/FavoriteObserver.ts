import type { IFavoriteService } from "@typings/favorite";
import DeletePostCommand from "../post/PostCommands";
import DeleteUserCommand from "../user/UserCommands";

export class FavoriteObserver implements IObserver {
  watching: string[] = ["delete_post", "delete_user"];
  constructor(readonly favoriteService: IFavoriteService) {}

  async notifyService(command: ICommand):  Promise<any> {
    if (command.operation === "delete_post") {
      const { postId } = command as DeletePostCommand;
      await this.favoriteService.deleteAllFavoritesByPostId(postId);
    }

    if (command.operation === "delete_user") {
      const { userId } = command as DeleteUserCommand;
      await this.favoriteService.deleteAllFavoritesByUserId(userId);
    }
  }
}
