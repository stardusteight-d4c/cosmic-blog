import { IUserReflectObject } from "@domain/src/user";

export interface ICommentReflectObject {
  id?: string;
  postId: string;
  owner: IUserReflectObject;
  content: string;
  postedAt: Date;
}
