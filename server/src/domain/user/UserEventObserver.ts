import { IUserService } from ".";
import { IEvent, IEventObserver } from "../@interfaces";

export class UserEventObserver implements IEventObserver {
  watching: string[] = ["create_post"];
  constructor(readonly userService: IUserService) {}

  async notifyService(event: IEvent) {}
}
