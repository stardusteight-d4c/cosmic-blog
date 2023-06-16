export class Publisher implements IPublisher {
  private static instance: Publisher;
  private subscriberServices: ISubscriber[];

  private constructor() {
    this.subscriberServices = [];
  }

  public static getInstance(): Publisher {
    if (!Publisher.instance) {
      Publisher.instance = new Publisher();
    }
    return Publisher.instance;
  }

  public register(subscriber: ISubscriber) {
    if (!this.subscriberServices.includes(subscriber)) {
      this.subscriberServices.push(subscriber);
    }
  }

  public async publish(request: {
    command: ICommand;
    targetSubscriber?: ISubscriber;
  }): Promise<{ responses: any[]; uniqueResponse: any }> {
    const { command, targetSubscriber } = request;
    const responses: any[] = [];
    let uniqueResponse: any;
    if (targetSubscriber) {
      if (targetSubscriber.signing.includes(command.operation)) {
        const response = await targetSubscriber.notifyService(command);
        uniqueResponse = response;
      }
    } else {
      for (const observer of this.subscriberServices) {
        const response = await observer.notifyService(command);
        responses.push(response);
      }
    }
    return { responses, uniqueResponse };
  }
}
