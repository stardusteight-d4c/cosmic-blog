import { randomUUID } from "node:crypto";
import { User, IUserReflectObject } from "./User";

export interface ICommentReflectObject {
  id: string;
  postedAt: Date;
  author: IUserReflectObject;
  body: string;
}

export class Comment {
  id: string;
  postedAt: Date;
  author: User;
  body: string;

  constructor(properties: ICommentReflectObject) {
    this.id = properties.id || randomUUID();
    this.body = properties.body;
    this.postedAt = properties.postedAt;
    this.author = new User(properties.author);
  }

  public get reflect(): ICommentReflectObject {
    return {
      id: this.id,
      body: this.body,
      postedAt: this.postedAt,
      author: this.author.reflect,
    };
  }

  // public canEdit(author: User): boolean {
  //   return this.author.id === author.id
  // }
}
