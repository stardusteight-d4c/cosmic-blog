import { IEvent, IEventObserver } from "@domain/@interfaces";
import { CommentService } from "./CommentService";

export class CommentEventObserver implements IEventObserver {
  watching: string[] = ["favorite_post", "comment_post", "create_post"];
  constructor(readonly commentService: CommentService) {}

  async notifyService(event: IEvent) {}
}
