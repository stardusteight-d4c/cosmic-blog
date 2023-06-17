import type { IFavoriteService } from "@/@typings/favorite";
import { FindAllFavoritesByUserIdCommand } from "@domain/commands";
import { DeletePostCommand } from "../post/PostCommands";
import { DeleteUserCommand } from "../user/UserCommands";

export class FavoriteSubscriber implements ISubscriber {
  signing: string[] = [
    "delete_post",
    "delete_user",
    "find_all_favorites_by_user_id",
  ];
  private static instance: FavoriteSubscriber;
  private readonly favoriteService: IFavoriteService;

  private constructor(favoriteService: IFavoriteService) {
    this.favoriteService = favoriteService;
  }

  public static getInstance(
    favoriteService?: IFavoriteService
  ): FavoriteSubscriber {
    if (!FavoriteSubscriber.instance) {
      if (!favoriteService) {
        throw new Error(
          "FavoriteService must be provided when creating the first instance of FavoriteSubscriber"
        );
      }
      FavoriteSubscriber.instance = new FavoriteSubscriber(favoriteService);
    }
    return FavoriteSubscriber.instance;
  }

  async notifyService(command: ICommand): Promise<any> {
    if (command.operation === "delete_post") {
      const { postId } = command as DeletePostCommand;
      await this.favoriteService.deleteAllFavoritesByPostId(postId);
    }

    if (command.operation === "delete_user") {
      const { userId } = command as DeleteUserCommand;
      await this.favoriteService.deleteAllFavoritesByUserId(userId);
    }

    if (command.operation === "find_all_favorites_by_user_id") {
      const { userId } = command as FindAllFavoritesByUserIdCommand;
      console.log("find_all_favorites_by_user_id", userId);
      return await this.favoriteService.getAllFavoritesByUserId(userId);
    }
  }
}
