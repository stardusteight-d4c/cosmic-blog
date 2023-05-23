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
  favorites: string[]
  commentedPosts: number
}
