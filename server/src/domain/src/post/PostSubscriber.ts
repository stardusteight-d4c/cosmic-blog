import type { IPostService } from "@typings/post";
import { FindByIdCommand } from "@domain/globalsCommands";

export class PostSubscriber implements ISubscriber {
  signing: string[] = ["find_by_id"];
  private static instance: PostSubscriber;
  private readonly postService: IPostService;

  private constructor(postService: IPostService) {
    this.postService = postService;
  }

  public static getInstance(postService?: IPostService): PostSubscriber {
    if (!PostSubscriber.instance) {
      if (!postService) {
        throw new Error(
          "PostService must be provided when creating the first instance of PostSubscriber"
        );
      }
      PostSubscriber.instance = new PostSubscriber(postService);
    }
    return PostSubscriber.instance;
  }

  async notifyService(command: ICommand) {
    if (command.operation === "find_by_id") {
      const { id } = command as FindByIdCommand;
      return await this.postService.getPostById(id);
    }
  }
}
