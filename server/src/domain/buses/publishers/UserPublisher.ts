import Command from "../commands/ICommand";
import IObserver from "../observers/IObserver";

export class UserPublisher {
  servicesObservers: IObserver[];
  constructor() {
    this.servicesObservers = [];
  }
  register(observer: IObserver) {
    this.servicesObservers.push(observer);
  }
  publish(command: Command) {
    for (const observer of this.servicesObservers) {
      if (observer.operations.includes(command.operation)) {
        observer.notifyService(command);
      }
    }
  }
}
