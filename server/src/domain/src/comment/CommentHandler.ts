import { FindByIdCommand } from "@/domain/globalsCommands";
import { ICommentRepository } from "@typings/comment";
import { UserSubscriber } from "../user";
import { userErrors } from "../user/helpers";
import { PostSubscriber } from "../post";
import { postErrors } from "../post/helpers";
import { commentErrors } from "./helpers";

export class CommentHandler {
  #commentRepository: ICommentRepository;
  #publisher: IPublisher;

  constructor(implementations: {
    commentRepository: ICommentRepository;
    publisher: IPublisher;
  }) {
    this.#commentRepository = implementations.commentRepository;
    this.#publisher = implementations.publisher;
  }

  async findUserIdOrThrowError(id: string) {
    const command = new FindByIdCommand(id);
    const targetSubscriber = UserSubscriber.getInstance();
    return this.#publisher
      .publish({
        command,
        targetSubscriber,
      })
      .then(async ({ uniqueResponse: existingUser }) => {
        if (!existingUser) {
          throw new Error(userErrors.userNotFoundWithId(id));
        }
        return existingUser;
      });
  }

  async findPostIdOrThrowError(id: string) {
    const command = new FindByIdCommand(id);
    const targetSubscriber = PostSubscriber.getInstance();
    return this.#publisher
      .publish({
        command,
        targetSubscriber,
      })
      .then(async ({ uniqueResponse: existingPost }) => {
        if (!existingPost) {
          throw new Error(postErrors.postNotFoundWithId(id));
        }
        return existingPost;
      });
  }

  async findCommentIdOrThrowError(id: string) {
    return this.#commentRepository
      .findById(id)
      .then(async (existingComment) => {
        if (!existingComment) {
          throw new Error(commentErrors.commentNotFoundWithId(id));
        }
        return existingComment;
      });
  }
}
