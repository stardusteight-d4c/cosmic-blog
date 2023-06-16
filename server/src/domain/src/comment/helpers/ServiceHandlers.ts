import { FindByIdCommand } from "@/domain/globalsCommands";
import { UserSubscriber } from "../../user";
import { err } from "./errors";
import { PostSubscriber } from "../../post";
import { CommentSubscriber } from "../CommentSubscriber";
import { ICommentRepository } from "@/@typings/comment";

namespace ServiceHandlers {
  export async function findUserIdOrThrowError(params: {
    id: string;
    publisher: IPublisher;
  }) {
    const { id, publisher } = params;
    const command = new FindByIdCommand(id);
    const targetSubscriber = UserSubscriber.getInstance();
    const { uniqueResponse: existingUser } = await publisher.publish({
      command,
      targetSubscriber,
    });
    if (!existingUser) {
      throw new Error(err.userNotFoundWithId(id));
    }
    return existingUser;
  }

  export async function findPostIdOrThrowError(params: {
    id: string;
    publisher: IPublisher;
  }) {
    const { id, publisher } = params;
    const command = new FindByIdCommand(id);
    const targetSubscriber = PostSubscriber.getInstance();
    const { uniqueResponse: existingPost } = await publisher.publish({
      command,
      targetSubscriber,
    });
    if (!existingPost) {
      throw new Error(err.postNotFoundWithId(id));
    }
    return existingPost;
  }

  export async function findCommentIdOrThrowError(params: {
    id: string;
    commentRepository: ICommentRepository;
  }) {
    const { id, commentRepository } = params;
    const existingComment = commentRepository.findById(id);
    if (!existingComment) {
      throw new Error(err.commentNotFoundWithId(id));
    }
    return existingComment;
  }
}

export default ServiceHandlers;
