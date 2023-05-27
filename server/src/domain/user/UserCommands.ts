import { ICommand } from "../@interfaces";

export default class DeleteUserCommand implements ICommand {
  operation = "delete_user";
  constructor(readonly userId: string) {}
}
