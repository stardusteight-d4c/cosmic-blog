import { IEvent } from "@/domain/@interfaces";
import { Post } from "./Post";

export class CreatePostEvent implements IEvent {
  name = "create_post";
  constructor(readonly post: Post) {}
}

export class FavoritePostEvent implements IEvent {
  name = "favorite_post";
  constructor(readonly userId: string, readonly postId: string) {}
}
