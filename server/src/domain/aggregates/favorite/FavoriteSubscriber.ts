import type { IFavoriteService } from "@typings/favorite";
import {
  FindAllFavoritesByUserIdCommand,
  FindFavoriteCommand,
} from "@domain/commands";
import {
  DeletePostCommand,
  GetPostFavoriteAmountCommand,
} from "../post/PostCommands";
import { DeleteUserCommand, GetUserFavoriteAmountCommand } from "../user/UserCommands";

export class FavoriteSubscriber implements ISubscriber {
  signing: string[] = [
    "delete_post",
    "delete_user",
    "find_all_favorites_by_user_id",
    "get_post_favorite_amount",
    "find_favorite",
    "get_user_favorite_amount",
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
      return await this.favoriteService.getAllFavoritesByUserId(userId);
    }

    if (command.operation === "get_post_favorite_amount") {
      const { postId } = command as GetPostFavoriteAmountCommand;
      return await this.favoriteService.getPostFavoriteAmount(postId);
    }

    if (command.operation === "find_favorite") {
      const { favorite } = command as FindFavoriteCommand;
      return await this.favoriteService.getFavorite(favorite);
    }

    if (command.operation ===  "get_user_favorite_amount") {
      const { userId } = command as GetUserFavoriteAmountCommand;
      return await this.favoriteService.getUserFavoriteAmount(userId);
    }
  }
}
