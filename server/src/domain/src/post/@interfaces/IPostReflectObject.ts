import { IUserReflectObject } from "@domain/src/user";

export interface IPostReflectObject {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedIn: Date;
  lastChange?: Date;
  author: IUserReflectObject;
}
