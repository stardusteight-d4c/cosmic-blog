import { IUserReflectObject } from "@/domain/user";

export interface ICommentReflectObject {
  id?: string;
  postedAt: Date;
  owner: IUserReflectObject;
  content: string;
}
