interface ICommand {
  operation: string;
}

interface IObserver {
  watching: string[];
  notifyService(event: ICommand): any;
}

interface IPublisher {
  register(observer: IObserver): void;
  emit(event: ICommand): Promise<any[]>;
}
