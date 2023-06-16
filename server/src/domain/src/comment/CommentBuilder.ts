import type { IUserReflectObject } from "@typings/user";
import { randomUUID } from "node:crypto";
import { Comment } from ".";
import { PostMetadata } from "@/@typings/comment";

export class CommentBuilder {
  #id: string;
  #post: PostMetadata;
  #owner: IUserReflectObject;
  #content: string;
  #postedAt: Date;

  public setId(id: string) {
    this.#id = id;
    return this;
  }

  public setPost(post: PostMetadata): CommentBuilder {
    this.#post = post;
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
    if (!this.#post.id) {
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
      post: this.#post,
      owner: this.#owner,
      content: this.#content,
      postedAt: this.#postedAt,
    });
  }
}
