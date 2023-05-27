import { ICommentService } from ".";
import { ICommand, IObserver } from "@domain/@interfaces";
import DeletePostCommand from "../post/PostCommands";
import DeleteUserCommand from "../user/UserCommands";

export class CommentObserver implements IObserver {
  watching: string[] = ["delete_post", "delete_user"];
  constructor(readonly commentService: ICommentService) {}

  async notifyService(command: ICommand) {
    if (command.operation === this.watching[0]) {
      const { postId } = command as DeletePostCommand;
      await this.commentService.deleteAllCommentsByPostId(postId);
    }

    if (command.operation === this.watching[1]) {
      const { userId } = command as DeleteUserCommand;
      await this.commentService.deleteAllCommentsByUserId(userId);
    }
  }
}
