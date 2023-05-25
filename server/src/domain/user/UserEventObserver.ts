import { IUserService } from ".";
import { IEvent, IEventObserver } from "../@interfaces";

export class UserEventObserver implements IEventObserver {
  watching: string[] = [];
  constructor(readonly userService: IUserService) {}

  async notifyService(event: IEvent) {}
}
