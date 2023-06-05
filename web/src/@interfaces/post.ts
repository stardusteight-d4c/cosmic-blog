import { IUserObject } from "./user";

export interface IPostObject {
[x: string]: any;
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedIn: Date;
  lastChange?: Date;
  author: IUserObject;
}
