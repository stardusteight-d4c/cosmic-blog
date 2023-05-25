import { IPostService } from ".";
import { IEvent, IEventObserver } from "@domain/@interfaces";

export class PostEventObserver implements IEventObserver {
  watching: string[] = [];
  constructor(readonly postService: IPostService) {}

  async notifyService(event: IEvent) {}
}
