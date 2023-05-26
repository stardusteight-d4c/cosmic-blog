import { IFavoriteService } from ".";
import { ICommand, IObserver } from "../@interfaces";
import DeletePostCommand from "../post/PostCommands";

export class FavoriteObserver implements IObserver {
  watching: string[] = ["delete_post"];
  constructor(readonly favoriteService: IFavoriteService) {}

  async notifyService(command: ICommand) {
    if (command.operation === this.watching[0]) {
      const { postId } = command as DeletePostCommand;
      await this.favoriteService.deleteAllFavoritesByPostId(postId);
    }
  }
}
