interface ICommand {
  operation: string;
}

interface IObserver {
  watching: string[];
  notifyService(event: ICommand): Promise<any>;
}

interface IPublisher {
  register(observer: IObserver): void;
  publish(request: {
    command: ICommand;
    targetObserver?: IObserver;
  }): Promise<{ responses: any; uniqueResponse: any }>;
}
