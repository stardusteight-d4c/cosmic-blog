import { randomUUID } from "node:crypto";
import { IUserReflectObject, User } from "../user";
import { Comment } from "./Comment";

export class CommentBuilder {
  #id: string;
  #postId: string;
  #owner: IUserReflectObject;
  #content: string;
  #postedAt: Date;

  public setId(id: string) {
    this.#id = id;
    return this;
  }

  public setPostId(postId: string): CommentBuilder {
    this.#postId = postId;
    return this;
  }

  public setOwner(owner: IUserReflectObject): CommentBuilder {
    this.#owner = owner;
    return this;
  }

  public setContent(content: string): CommentBuilder {
    this.#content = content;
    return this;
  }

  public setpostedAt(postedAt: Date): CommentBuilder {
    this.#postedAt = postedAt;
    return this;
  }

  public build(): Comment {
    if (!this.#postId) {
      throw new Error("postId is required");
    }
    if (!this.#owner) {
      throw new Error("owner is required");
    }
    if (!this.#content) {
      throw new Error("content is required");
    }
    if (!this.#postedAt) {
      throw new Error("postedAt is required");
    }

    return new Comment({
      id: this.#id || randomUUID(),
      postId: this.#postId,
      owner: this.#owner,
      content: this.#content,
      postedAt: this.#postedAt,
    });
  }
}
