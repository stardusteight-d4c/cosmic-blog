import { ICommand, IObserver } from "@domain/@interfaces";

export default class UserPublisher {
  servicesObservers: IObserver[];
  constructor() {
    this.servicesObservers = [];
  }
  register(observer: IObserver) {
    this.servicesObservers.push(observer);
  }
  async publish(command: ICommand) {
    const responses = [];
    for (const observer of this.servicesObservers) {
      if (observer.operations.includes(command.operation)) {
        const response = await observer.notifyService(command);
        responses.push(response);
      }
    }
    return responses;
  }
}
