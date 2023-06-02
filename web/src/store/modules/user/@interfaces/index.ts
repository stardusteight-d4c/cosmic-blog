import { TUserRole } from "../../login/@interfaces";

export interface ISocialLinks {
  [key: string]: string | undefined;
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
}

export interface IUserData {
  id: string
  email: string
  username: string
  password: string
  avatar: string
  userRole: TUserRole
  socialLinks: ISocialLinks | undefined
  favoriteAmount: number
  commentAmount: number
}

export interface IUserReflectObject {
  id?: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  userRole?: TUserRole;
  socialLinks?: ISocialLinks | undefined;
}
