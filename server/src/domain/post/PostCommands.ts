import { ICommand } from "@domain/@interfaces";
import Comment from "../comment/Comment";

export class FavoritePostCommand implements ICommand {
  operation = "favorite_post_command";
  constructor(readonly userId: string, readonly postId: string) {}
}

export class CommentPostCommand implements ICommand {
  operation = "comment_post_command";
  constructor(readonly comment: Comment, readonly postId: string) {}
}
