import { IUserReflectObject } from "@/domain/user";

export interface ICommentReflectObject {
  id?: string;
  postedAt: Date;
  author: IUserReflectObject;
  content: string;
}
