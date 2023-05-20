import { IEvent } from "./IEvent";

export interface IEventObserver {
  operations: string[];
  notifyService(event: IEvent): any;
}
