import { IEvent } from "@domain/@interfaces";
import { Comment } from "./Comment";

export class CreateCommentEvent implements IEvent {
  name = "create_comment";
  constructor(readonly comment: Comment) {}
}

export class DeleteCommentEvent implements IEvent {
  name = "delete_comment";
  constructor(readonly comment: Comment) {}
}
