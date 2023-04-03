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
  async publish(command: Command) {
    for (const observer of this.servicesObservers) {
      if (observer.operations.includes(command.operation)) {
        const response = await observer.notifyService(command);
        return response
      }
    }
  }
}
