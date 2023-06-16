export class Publisher implements IPublisher {
  private static instance: Publisher;
  private servicesObservers: IObserver[];

  private constructor() {
    this.servicesObservers = [];
  }

  public static getInstance(): Publisher {
    if (!Publisher.instance) {
      Publisher.instance = new Publisher();
    }
    return Publisher.instance;
  }

  public register(observer: IObserver) {
    if (!this.servicesObservers.includes(observer)) {
      this.servicesObservers.push(observer);
    }
  }

  public async publish(request: {
    command: ICommand;
    targetObserver?: IObserver;
  }): Promise<{ responses: any[]; uniqueResponse: any }> {
    const { command, targetObserver } = request;
    const responses: any[] = [];
    let uniqueResponse: any;
    if (targetObserver) {
      if (targetObserver.watching.includes(command.operation)) {
        const response = await targetObserver.notifyService(command);
        uniqueResponse = response
      }
    } else {
      for (const observer of this.servicesObservers) {
        const response = await observer.notifyService(command);
        responses.push(response);
      }
    }
    return { responses, uniqueResponse };
  }
}
