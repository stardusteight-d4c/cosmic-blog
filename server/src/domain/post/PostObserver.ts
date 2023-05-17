import { FavoritePostCommand, PostService } from ".";
import { ICommand, IObserver } from "@domain/@interfaces";
import { CommentPostCommand } from "./PostCommands";

export default class PostObserver implements IObserver {
  operations: string[] = ["favorite_post_command", "comment_post_command"];
  constructor(readonly postService: PostService) {}

  async notifyService(command: ICommand): Promise<any> {
    if (command.operation === "favorite_post_command") {
      const response = await this.postService.handlerFavoritePostCommand(
        command as FavoritePostCommand,
      );
      return response;
    }

    if (command.operation === "comment_post_command") {
      const response = await this.postService.handlerCommentPost(
        command as CommentPostCommand,
      );
      return response;
    }
  }
}
