import { ICommentService } from ".";
import { ICommand, IObserver } from "../@interfaces";
import DeletePostCommand from "../post/PostCommands";

export class CommentObserver implements IObserver {
  watching: string[] = ["delete_post"];
  constructor(readonly commentService: ICommentService) {}

  async notifyService(command: ICommand) {
    if (command.operation === this.watching[0]) {
      const { postId } = command as DeletePostCommand;
      await this.commentService.deleteAllCommentsByPostId(postId);
    }
  }
}
