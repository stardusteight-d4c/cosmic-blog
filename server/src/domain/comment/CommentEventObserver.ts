import { IEvent, IEventObserver } from "@domain/@interfaces";
import { ICommentService } from "./@interfaces";

export class CommentEventObserver implements IEventObserver {
  watching: string[] = [];
  constructor(readonly commentService: ICommentService) {}

  async notifyService(event: IEvent) {}
}
