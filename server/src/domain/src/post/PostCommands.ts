import { ICommand } from "@domain/@interfaces";

export default class DeletePostCommand implements ICommand {
  operation = "delete_post";
  constructor(readonly postId: string) {}
}
