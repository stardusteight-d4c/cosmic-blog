import { UserService } from ".";
import { IEvent, IEventObserver } from "../@interfaces";
import { CommentPostEvent } from "../comment";
import { FavoritePostEvent } from "../post";

export class UserEventObserver implements IEventObserver {
  watching: string[] = ["favorite_post", "comment_post"];
  constructor(readonly userService: UserService) {}

  async notifyService(event: IEvent) {
    if (event.name === "favorite_post") {
      const response = await this.userService.handlerFavoritePostEvent(
        event as FavoritePostEvent,
      );
      return response;
    }

    if (event.name === "comment_post") {
      const response = await this.userService.handlerCommentPostEvent(
        event as CommentPostEvent,
      );
      return response;
    }
  }
}
