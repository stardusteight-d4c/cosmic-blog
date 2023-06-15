export class Publisher implements IPublisher {
  servicesObservers: IObserver[];
  constructor() {
    this.servicesObservers = [];
  }
  register(observer: IObserver) {
    this.servicesObservers.push(observer);
  }
  async emit(command: ICommand) {
    const responses = [];
    for (const observer of this.servicesObservers) {
      if (observer.watching.includes(command.operation)) {
        const response = await observer.notifyService(command);
        responses.push(response);
      }
    }
    return responses;
  }
}
