import { randomUUID } from "node:crypto";
import type { OwnerMetadata, PostMetadata } from "@typings/comment";
import { Comment } from ".";
import { Validators } from "./helpers";

export class CommentBuilder {
  #id: string;
  #post: PostMetadata;
  #owner: OwnerMetadata;
  #content: string;
  #postedAt: Date;

  public setId(id: string) {
    this.#id = id;
    return this;
  }

  public setPost(post: PostMetadata): CommentBuilder {
    Validators.validatePost(post);
    this.#post = post;
    return this;
  }

  public setOwner(owner: OwnerMetadata): CommentBuilder {
    Validators.validateOwner(owner);
    this.#owner = owner;
    return this;
  }

  public setContent(content: string): CommentBuilder {
    Validators.validateContent(content);
    this.#content = content;
    return this;
  }

  public setPostedAt(postedAt: Date): CommentBuilder {
    Validators.validatePostedAt(postedAt);
    this.#postedAt = postedAt;
    return this;
  }

  public build(): Comment {
    return new Comment({
      id: this.#id || randomUUID(),
      post: this.#post,
      owner: this.#owner,
      content: this.#content,
      postedAt: this.#postedAt,
    });
  }
}
