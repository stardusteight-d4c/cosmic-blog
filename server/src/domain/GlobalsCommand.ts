export default class FindByIdCommand implements ICommand {
  operation = "find_by_id";
  constructor(readonly id: string) {}
}
