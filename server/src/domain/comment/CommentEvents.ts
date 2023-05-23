import { IEvent } from "@domain/@interfaces";
import { Comment } from "./Comment";

export class CommentPostEvent implements IEvent {
  name = "comment_post";
  constructor(readonly comment: Comment) {}
}
