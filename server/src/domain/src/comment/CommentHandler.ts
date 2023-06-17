import { FindByIdCommand } from "@domain/commands";
import { ICommentRepository } from "@typings/comment";
import { User, UserSubscriber } from "../user";
import { userErrors } from "../user/helpers";
import { Post, PostSubscriber } from "../post";
import { postErrors } from "../post/helpers";
import { commentErrors } from "./helpers";
import { Comment } from "./Comment";

type UserResponse = { uniqueResponse: User };
type PostResponse = { uniqueResponse: Post };

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

  async findUserIdOrThrowError(id: string): Promise<User> {
    return this.#publisher
      .publish({
        command: new FindByIdCommand(id),
        targetSubscriber: UserSubscriber.getInstance(),
      })
      .then(async ({ uniqueResponse: existingUser }: UserResponse) => {
        if (!existingUser) {
          throw new Error(userErrors.userNotFoundWithId(id));
        }
        return existingUser;
      });
  }

  async findPostIdOrThrowError(id: string): Promise<Post> {
    return this.#publisher
      .publish({
        command: new FindByIdCommand(id),
        targetSubscriber: PostSubscriber.getInstance(),
      })
      .then(async ({ uniqueResponse: existingPost }: PostResponse) => {
        if (!existingPost) {
          throw new Error(postErrors.postNotFoundWithId(id));
        }
        return existingPost;
      });
  }

  async findCommentIdOrThrowError(id: string): Promise<Comment> {
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
