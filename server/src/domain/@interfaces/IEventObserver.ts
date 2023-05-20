import { IEvent } from "./IEvent";

export interface IEventObserver {
  watching: string[];
  notifyService(event: IEvent): any;
}

