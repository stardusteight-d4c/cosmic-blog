import { randomUUID } from "node:crypto";
import { Post } from ".";
import { User } from "@domain/user";
import { Favorite } from "@domain/favorite";
import { Comment } from "@domain/comment";

export class PostBuilder {
  #id: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedIn: Date;
  #lastChange?: Date;
  #author: User;
  #favorites: Favorite[] = [];
  #comments: Comment[] = [];

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

  public setAuthor(Author: User): PostBuilder {
    this.#author = Author;
    return this;
  }

  public setFavorites(favorites: Favorite[]): PostBuilder {
    if (favorites === undefined) {
      this.#favorites = [];
      return this;
    }
    this.#favorites = favorites;
    return this;
  }

  public setComments(comments: Comment[]): PostBuilder {
    if (comments === undefined) {
      this.#comments = [];
      return this;
    }
    this.#comments = comments;
    return this;
  }

  public build(): Post {
    if (!this.#title) {
      throw new Error("title is required.");
    }
    if (!this.#body) {
      throw new Error("body is required.");
    }
    if (!this.#tags) {
      throw new Error("tags is required.");
    }
    if (!this.#coverImage) {
      throw new Error("coverImage is required.");
    }
    if (!this.#postedIn) {
      throw new Error("postedIn is required.");
    }
    if (!this.#author) {
      throw new Error("author is required.");
    }
    return new Post({
      id: this.#id || randomUUID(),
      title: this.#title,
      body: this.#body,
      tags: this.#tags,
      coverImage: this.#coverImage,
      postedIn: this.#postedIn,
      lastChange: this.#lastChange,
      author: this.#author.reflect,
      favorites: this.#favorites.map((favorite) => favorite.reflect),
      comments: this.#comments.map((comment) => comment.reflect),
    });
  }
}
