import { IUserReflectObject } from "@/domain/user";

export interface ICommentReflectObject {
  id?: string;
  postId: string;
  owner: IUserReflectObject;
  content: string;
  postedAt: Date;
}
