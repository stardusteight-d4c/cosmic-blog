import { IUserService } from ".";
import { ICommand, IObserver } from "../@interfaces";

export class UserEventObserver implements IObserver {
  watching: string[] = ["create_post"];
  constructor(readonly userService: IUserService) {}

  async notifyService(command: ICommand) {}
}
