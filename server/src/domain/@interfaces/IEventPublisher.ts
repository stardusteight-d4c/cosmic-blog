import { IEvent } from "./IEvent";
import { IEventObserver } from "./IEventObserver";

export interface IEventPublisher {
  register(observer: IEventObserver): void;
  emit(event: IEvent): Promise<any[]>;
}
