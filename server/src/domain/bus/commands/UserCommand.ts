import ICommand from "./ICommand";

export class FavoritePostCommand implements ICommand {
  operation = "favorite_post_command";
  constructor(readonly userId: string, readonly postId: string) {}
}
