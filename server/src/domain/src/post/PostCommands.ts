export  class DeletePostCommand implements ICommand {
  operation = "delete_post";
  constructor(readonly postId: string) {}
}
