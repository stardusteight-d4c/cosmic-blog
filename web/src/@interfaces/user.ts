import { TUserRole } from "./login";

export interface ISocialLinks {
  [key: string]: string | undefined;
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
}

export interface IUser {
  id: string
  email: string
  username: string
  avatar: string
  userRole: TUserRole
  socialLinks: ISocialLinks | undefined
  favoriteAmount?: number
  commentAmount?: number
}

export interface IUserObject {
  id?: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  userRole?: TUserRole;
  socialLinks?: ISocialLinks | undefined;
}

