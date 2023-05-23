import { FavoritePostEvent, PostService } from ".";
import { IEvent, IEventObserver } from "@domain/@interfaces";
import { CreatePostEvent } from "./PostEvents";
import { CommentPostEvent } from "../comment";

export class PostEventObserver implements IEventObserver {
  watching: string[] = ["favorite_post", "comment_post", "create_post"];
  constructor(readonly postService: PostService) {}

  async notifyService(event: IEvent) {
    if (event.name === "create_post") {
      const response = await this.postService.handlerCreatePostEvent(
        event as CreatePostEvent,
      );
      return response;
    }

    if (event.name === "favorite_post") {
      const response = await this.postService.handlerFavoritePostEvent(
        event as FavoritePostEvent,
      );
      return response;
    }

    if (event.name === "comment_post") {
      const response = await this.postService.handlerCommentPostEvent(
        event as CommentPostEvent,
      );
      return response;
    }
  }
}
