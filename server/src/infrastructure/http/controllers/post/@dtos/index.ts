import { IUserReflectObject } from "@/@typings/user";

export interface IGetPostResponse {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedIn: Date;
  lastChange?: Date;
  author: IUserReflectObject;
  isAuthor?: boolean;
  isGuest?: boolean;
  isFavorited?: boolean;
  favoriteAmount: number
  commentAmount: number
}
