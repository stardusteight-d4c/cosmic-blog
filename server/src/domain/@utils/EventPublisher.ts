import { IEvent, IEventObserver, IEventPublisher } from "@domain/@interfaces";

export class EventPublisher implements IEventPublisher {
  servicesObservers: IEventObserver[];
  constructor() {
    this.servicesObservers = [];
  }
  register(observer: IEventObserver) {
    this.servicesObservers.push(observer);
  }
  async emit(event: IEvent) {
    const responses = [];
    for (const observer of this.servicesObservers) {
      if (observer.watching.includes(event.name)) {
        const response = await observer.notifyService(event);
        responses.push(response);
      }
    }
    return responses;
  }
}