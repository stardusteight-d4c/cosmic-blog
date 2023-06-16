import { FindByIdCommand } from "@/domain/globalsCommands";
import { UserSubscriber } from "../../user";
import { userErrors } from "../../user/helpers";
import { publisher } from "@domain/helpers/initializeServices";
import { PostSubscriber } from "../../post";
import { postErrors } from "../../post/helpers";

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
}

export default ServiceHandlers;
