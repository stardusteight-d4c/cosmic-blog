export class DeleteUserCommand implements ICommand {
  operation = "delete_user";
  constructor(readonly userId: string) {}
}
