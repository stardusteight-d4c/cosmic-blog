import { UserService } from ".";
import {IEvent, IEventObserver} from "../@interfaces";
import { CommentPostEvent, FavoritePostEvent } from "../post";

export class UserEventObserver implements IEventObserver {
  operations: string[] = ["favorite_post_event", "comment_post_event"];
  constructor(readonly userService: UserService) {}

  async notifyService(event: IEvent): Promise<any> {
    if (event.operation === "favorite_post_event") {
      const response = await this.userService.handlerFavoritePostEvent(
        event as FavoritePostEvent,
      );
      return response;
    }

    if (event.operation === "comment_post_event") {
      const response = await this.userService.handlerCommentPostEvent(
        event as CommentPostEvent,
      );
      return response;
    }
  }
}
