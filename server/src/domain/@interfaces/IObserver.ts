import ICommand from './ICommand'

export default interface IObserver {
  operations: string[];
  notifyService(command: ICommand): any;
}