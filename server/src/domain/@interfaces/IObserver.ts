import { ICommand } from "./ICommand";

export interface IObserver {
  watching: string[];
  notifyService(event: ICommand): any;
}

