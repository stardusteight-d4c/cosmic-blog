import type { ICommentService } from "@typings/comment";
import { FindByIdCommand } from "@domain/globalsCommands";
import { DeletePostCommand } from "../post/PostCommands";
import { DeleteUserCommand } from "../user/UserCommands";

export class CommentSubscriber implements ISubscriber {
  signing: string[] = ["delete_post", "delete_user", "find_by_id"];
  private static instance: CommentSubscriber;
  private readonly commentService: ICommentService;

  private constructor(commentService: ICommentService) {
    this.commentService = commentService;
  }

  public static getInstance(
    commentService?: ICommentService
  ): CommentSubscriber {
    if (!CommentSubscriber.instance) {
      if (!commentService) {
        throw new Error(
          "CommentService must be provided when creating the first instance of CommentSubscriber"
        );
      }
      CommentSubscriber.instance = new CommentSubscriber(commentService);
    }
    return CommentSubscriber.instance;
  }

  async notifyService(command: ICommand): Promise<any> {
    if (command.operation === "delete_post") {
      const { postId } = command as DeletePostCommand;
      await this.commentService.deleteAllCommentsByPostId(postId);
    }

    if (command.operation === "delete_user") {
      const { userId } = command as DeleteUserCommand;
      await this.commentService.deleteAllCommentsByUserId(userId);
    }

    if (command.operation === "find_by_id") {
      const { id } = command as FindByIdCommand;
      await this.commentService.getCommentById(id);
    }
  }
}
