import { IEvent } from "@/domain/@interfaces";
import { Comment } from "../comment";

export class FavoritePostEvent implements IEvent {
  operation = "favorite_post_event";
  constructor(readonly userId: string, readonly postId: string) {}
}

export class CommentPostEvent implements IEvent {
  operation = "comment_post_event";
  constructor(readonly comment: Comment, readonly postId: string) {}
}
