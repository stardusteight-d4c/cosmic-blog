import ICommand from '../commands/ICommand'

export default interface IObserver {
  operations: string[];
  notifyService(command: ICommand): any;
}