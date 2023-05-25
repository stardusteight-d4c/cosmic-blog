import { FavoritePostEvent, IPostService, PostService } from ".";
import { IEvent, IEventObserver } from "@domain/@interfaces";
import { CreateCommentEvent, DeleteCommentEvent } from "../comment";

export class PostEventObserver implements IEventObserver {
  watching: string[] = [
    "create_post",
    "favorite_post",
    "create_comment",
    "delete_comment",
  ];
  constructor(readonly postService: IPostService) {}

  async notifyService(event: IEvent) {
    if (event.name === "favorite_post") {
      const response = await this.postService.handlerFavoritePostEvent(
        event as FavoritePostEvent,
      );
      return response;
    }

    if (event.name === "create_comment") {
      const response = await this.postService.handlerCreateCommentEvent(
        event as CreateCommentEvent,
      );
      return response;
    }

    if (event.name === "delete_comment") {
      await this.postService.handlerDeleteCommentEvent(
        event as DeleteCommentEvent,
      );
    }
  }
}
