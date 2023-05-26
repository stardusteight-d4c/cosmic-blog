import { ICommand } from "./ICommand";
import { IObserver } from "./IObserver";

export interface IPublisher {
  register(observer: IObserver): void;
  emit(event: ICommand): Promise<any[]>;
}
