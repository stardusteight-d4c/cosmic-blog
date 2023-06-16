import type { IPostService } from "@typings/post";
import FindByIdCommand from "@domain/GlobalsCommand";

export class PostObserver implements IObserver {
  watching: string[] = ["find_by_id"];
  constructor(readonly postService: IPostService) {}

  async notifyService(command: ICommand) {
    if (command.operation === "find_by_id") {
      const { id } = command as FindByIdCommand;
      return await this.postService.getPostById(id);
    }
  }
}
