import { randomUUID } from "node:crypto";
import { Post } from ".";
import { IUserReflectObject, User } from "@domain/user";
import { Favorite } from "@/domain/@value-objects/favorite";
import { Comment } from "@domain/comment";

export class PostBuilder {
  #id: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedIn: Date;
  #lastChange?: Date;
  #author: IUserReflectObject;
  #favoriteAmount: number;
  #commentAmount: number;

  public setId(id: string) {
    this.#id = id;
    return this;
  }

  public setTitle(title: string): PostBuilder {
    this.#title = title;
    return this;
  }

  public setBody(body: string): PostBuilder {
    this.#body = body;
    return this;
  }

  public setTags(tags: string[]): PostBuilder {
    if (tags && tags.length > 4) {
      throw new Error("the post must have a maximum of 4 tags");
    }
    this.#tags = tags;
    return this;
  }

  public setCoverImage(coverImage: string): PostBuilder {
    this.#coverImage = coverImage;
    return this;
  }

  public setPostedIn(postedIn: Date): PostBuilder {
    this.#postedIn = postedIn;
    return this;
  }

  public setLastChange(lastChange?: Date): PostBuilder {
    this.#lastChange = lastChange;
    return this;
  }

  public setAuthor(Author: IUserReflectObject): PostBuilder {
    this.#author = Author;
    return this;
  }

  public setFavoriteAmount(favoriteAmount: number): PostBuilder {
    if (favoriteAmount === undefined) {
      this.#favoriteAmount = 0;
      return this;
    }
    this.#favoriteAmount = favoriteAmount;
    return this;
  }

  public setCommentAmount(amount: number): PostBuilder {
    if (amount === undefined) {
      this.#commentAmount = 0;
      return this;
    }
    this.#commentAmount = amount;
    return this;
  }

  public build(): Post {
    if (!this.#title) {
      throw new Error("title is required");
    }
    if (!this.#body) {
      throw new Error("body is required");
    }
    if (!this.#tags) {
      throw new Error("tags is required");
    }
    if (!this.#coverImage) {
      throw new Error("coverImage is required");
    }
    if (!this.#postedIn) {
      throw new Error("postedIn is required");
    }
    if (!this.#author) {
      throw new Error("author is required");
    }
    return new Post({
      id: this.#id || randomUUID(),
      title: this.#title,
      body: this.#body,
      tags: this.#tags,
      coverImage: this.#coverImage,
      postedIn: this.#postedIn,
      lastChange: this.#lastChange,
      author: this.#author,
      favoriteAmount: this.#favoriteAmount,
      commentAmount: this.#commentAmount,
    });
  }
}
