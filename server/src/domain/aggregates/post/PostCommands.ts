export class DeletePostCommand implements ICommand {
  operation = "delete_post";
  constructor(readonly postId: string) {}
}

export class GetPostFavoriteAmountCommand implements ICommand {
  operation = "get_post_favorite_amount";
  constructor(readonly postId: string) {}
}

export class GetPostCommentAmountCommand implements ICommand {
  operation = "get_post_comment_amount";
  constructor(readonly postId: string) {}
}
