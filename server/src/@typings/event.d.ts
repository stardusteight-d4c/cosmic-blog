interface ICommand {
  operation: string;
}

interface ISubscriber {
  signing: string[];
  notifyService(command: ICommand): Promise<any>;
}

interface IPublisher {
  register(subscriber: ISubscribe): void;
  publish(request: {
    command: ICommand;
    targetSubscriber?: ISubscribe;
  }): Promise<{ responses: any; uniqueResponse: any }>;
}
