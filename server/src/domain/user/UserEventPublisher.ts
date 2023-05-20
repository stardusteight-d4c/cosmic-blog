import { IEvent, IEventObserver } from "@domain/@interfaces";

export class UserEventPublisher {
  servicesObservers: IEventObserver[];
  constructor() {
    this.servicesObservers = [];
  }
  register(observer: IEventObserver) {
    this.servicesObservers.push(observer);
  }
  async publish(event: IEvent) {
    const responses = [];
    for (const observer of this.servicesObservers) {
      if (observer.operations.includes(event.operation)) {
        const response = await observer.notifyService(event);
        responses.push(response);
      }
    }
    return responses;
  }
}
