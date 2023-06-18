export class DeleteUserCommand implements ICommand {
  operation = "delete_user";
  constructor(readonly userId: string) {}
}

export class GetUserFavoriteAmountCommand implements ICommand {
  operation = "get_user_favorite_amount";
  constructor(readonly userId: string) {}
}

export class GetUserCommentAmountCommand implements ICommand {
  operation = "get_user_comment_amount";
  constructor(readonly userId: string) {}
}
