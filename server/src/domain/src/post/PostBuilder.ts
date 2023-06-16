import type { IUserReflectObject } from "@typings/user";
import { randomUUID } from "node:crypto";
import { Post } from ".";
import { Validators } from "./helpers";

export class PostBuilder {
  #id: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedAt: Date;
  #lastChange?: Date;
  #author: IUserReflectObject;

  public setId(id: string) {
    this.#id = id;
    return this;
  }

  public setTitle(title: string): PostBuilder {
    Validators.validateTitle(title);
    this.#title = title;
    return this;
  }

  public setBody(body: string): PostBuilder {
    Validators.validateBody(body);
    this.#body = body;
    return this;
  }

  public setTags(tags: string[]): PostBuilder {
    Validators.validateTags(tags);
    this.#tags = tags;
    return this;
  }

  public setCoverImage(coverImage: string): PostBuilder {
    Validators.validateCoverImage(coverImage);
    this.#coverImage = coverImage;
    return this;
  }

  public setPostedAt(postedAt: Date): PostBuilder {
    Validators.validatePostedAt(postedAt);
    this.#postedAt = postedAt;
    return this;
  }

  public setLastChange(lastChange?: Date): PostBuilder {
    this.#lastChange = lastChange;
    return this;
  }

  public setAuthor(author: IUserReflectObject): PostBuilder {
    Validators.validateAuthor(author);
    this.#author = author;
    return this;
  }

  public build(): Post {
    return new Post({
      id: this.#id || randomUUID(),
      title: this.#title,
      body: this.#body,
      tags: this.#tags,
      coverImage: this.#coverImage,
      postedAt: this.#postedAt,
      lastChange: this.#lastChange,
      author: this.#author,
    });
  }
}
