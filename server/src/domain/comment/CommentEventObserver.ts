import { IEvent, IEventObserver } from "@domain/@interfaces";
import { CommentService } from "./CommentService";
import { CreateCommentEvent, DeleteCommentEvent } from "./CommentEvents";

export class CommentEventObserver implements IEventObserver {
  watching: string[] = ["create_comment", "delete_comment"];
  constructor(readonly commentService: CommentService) {}

  async notifyService(event: IEvent) {
    if (event.name === "create_comment") {
      return await this.commentService.handlerCreateCommentEvent(
        event as CreateCommentEvent,
      );
    }

    if (event.name === "delete_comment") {
      this.commentService.handlerDeleteCommentEvent(
        event as DeleteCommentEvent,
      );
    }
  }
}
