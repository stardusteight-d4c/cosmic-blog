import { IFavoriteReflectObject } from "@/domain/@object-values/favorite";
import { IUserReflectObject } from "@/domain/user";

export interface IPostReflectObject {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedIn: Date;
  lastChange?: Date;
  author: IUserReflectObject;
  favorites?: IFavoriteReflectObject[];
  commentAmount?: number;
}
