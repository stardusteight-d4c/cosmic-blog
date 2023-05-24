import { UserService } from ".";
import { IEvent, IEventObserver } from "../@interfaces";
import { CreateCommentEvent, DeleteCommentEvent } from "../comment";
import { FavoritePostEvent } from "../post";

export class UserEventObserver implements IEventObserver {
  watching: string[] = ["favorite_post", "create_comment", "delete_comment"];
  constructor(readonly userService: UserService) {}

  async notifyService(event: IEvent) {
    if (event.name === "favorite_post") {
      const response = await this.userService.handlerFavoritePostEvent(
        event as FavoritePostEvent,
      );
      return response;
    }

    if (event.name === "create_comment") {
      const response = await this.userService.handlerCreateCommentEvent(
        event as CreateCommentEvent,
      );
      return response;
    }

    if (event.name === "delete_comment") {
      await this.userService.handlerDeleteCommentEvent(
        event as DeleteCommentEvent,
      );
    }
  }
}
