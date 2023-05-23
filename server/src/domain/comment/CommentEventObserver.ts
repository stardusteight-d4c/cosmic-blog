import { IEvent, IEventObserver } from "@domain/@interfaces";
import { CommentService } from "./CommentService";

export class CommentEventObserver implements IEventObserver {
  watching: string[] = ["comment_post"];
  constructor(readonly commentService: CommentService) {}

  async notifyService(event: IEvent) {
    if (event.name === 'comment_post') {
      
    }
  }
}
