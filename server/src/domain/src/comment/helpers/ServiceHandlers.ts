import { FindByIdCommand } from "@/domain/globalsCommands";
import { ICommentRepository } from "@typings/comment";
import { PostSubscriber } from "../../post";
import { UserSubscriber } from "../../user";
import { commentErrors } from "./errors";
import { userErrors } from "../../user/helpers";
import { postErrors } from "../../post/helpers";
import { publisher } from "@/domain/helpers/initializeServices";

namespace ServiceHandlers {
  export async function findUserIdOrThrowError(id: string) {
    const command = new FindByIdCommand(id);
    const targetSubscriber = UserSubscriber.getInstance();
    const { uniqueResponse: existingUser } = await publisher.publish({
      command,
      targetSubscriber,
    });
    if (!existingUser) {
      throw new Error(userErrors.userNotFoundWithId(id));
    }
    return existingUser;
  }

  export async function findPostIdOrThrowError(id: string) {
    const command = new FindByIdCommand(id);
    const targetSubscriber = PostSubscriber.getInstance();
    const { uniqueResponse: existingPost } = await publisher.publish({
      command,
      targetSubscriber,
    });
    if (!existingPost) {
      throw new Error(postErrors.postNotFoundWithId(id));
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
      throw new Error(commentErrors.commentNotFoundWithId(id));
    }
    return existingComment;
  }
}

export default ServiceHandlers;
