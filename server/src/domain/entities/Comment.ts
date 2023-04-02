import { randomUUID } from "node:crypto";
import { User, UserReflectObject } from "./User";

export interface CommentReflectObject {
  id: string;
  postedAt: Date;
  author: UserReflectObject;
  body: string;
}

export class Comment {
  id: string;
  postedAt: Date;
  author: User;
  body: string;

  constructor(properties: CommentReflectObject) {
    this.id = properties.id || randomUUID();
    this.body = properties.body;
    this.postedAt = properties.postedAt;
    this.author = new User(properties.author);
  }

  public get reflect(): CommentReflectObject {
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
