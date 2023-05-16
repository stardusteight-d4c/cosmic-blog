import { IFavoriteReflectObject } from "@/domain/favorite";
import { ICommentReflectObject } from "@/domain/comment";
import { IPostReflectObject } from "@/domain/post";
import { TUserRole } from "./TUserRole";
import { ISocialLinks } from "./ISocialLinks";

export interface IUserReflectObject {
  id?: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  userRole?: TUserRole;
  socialLinks?: ISocialLinks | undefined;
  favoritedPosts?: IFavoriteReflectObject[];
  commentedPosts?: ICommentReflectObject[];
  publishedPosts?: IPostReflectObject[];
}
