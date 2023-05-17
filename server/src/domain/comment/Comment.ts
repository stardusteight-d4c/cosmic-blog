import { randomUUID } from "node:crypto";
import { User } from "@domain/user";
import { ICommentReflectObject } from "./@interfaces/ICommentReflectObject";

export default class Comment {
  #id: string;
  #postedAt: Date;
  #author: User;
  #content: string;

  constructor(properties: ICommentReflectObject) {
    this.#id = properties.id || randomUUID();
    this.#content = properties.content;
    this.#postedAt = properties.postedAt;
    this.#author = new User(properties.author);
  }

  public get reflect(): ICommentReflectObject {
    return {
      id: this.#id,
      content: this.#content,
      postedAt: this.#postedAt,
      author: this.#author.reflect,
    };
  }

  public canEdit(author: User): boolean {
    const isAuthor = this.#author.reflect.id === author.reflect.id;
    return isAuthor;
  }
}
