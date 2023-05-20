import { CommentPostEvent, FavoritePostEvent, PostService } from ".";
import { IEvent, IEventObserver } from "@domain/@interfaces";

export class PostEventObserver implements IEventObserver {
  operations: string[] = ["favorite_post_event", "comment_post_event"];
  constructor(readonly postService: PostService) {}

  async notifyService(event: IEvent): Promise<any> {
    if (event.operation === "favorite_post_event") {
      const response = await this.postService.handlerFavoritePostEvent(
        event as FavoritePostEvent,
      );
      return response;
    }

    if (event.operation === "comment_post_event") {
      const response = await this.postService.handlerCommentPostEvent(
        event as CommentPostEvent,
      );
      return response;
    }
  }
}
