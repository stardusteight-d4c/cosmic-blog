export class FindByIdCommand implements ICommand {
  operation = "find_by_id";
  constructor(readonly id: string) {}
}

export class FindAllFavoritesByUserIdCommand implements ICommand {
  operation = "find_all_favorites_by_user_id";
  constructor(readonly userId: string) {}
}
