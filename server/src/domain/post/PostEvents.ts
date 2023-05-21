import { IEvent } from "@/domain/@interfaces";
import { Comment } from "../comment";
import { Post } from "./Post";

export class CreatePostEvent implements IEvent {
  name = "create_post";
  constructor(readonly post: Post) {}
}

export class FavoritePostEvent implements IEvent {
  name = "favorite_post";
  constructor(readonly userId: string, readonly postId: string) {}
}

export class CommentPostEvent implements IEvent {
  name = "comment_post";
  constructor(readonly comment: Comment) {}
}
