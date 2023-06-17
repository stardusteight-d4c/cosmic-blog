import { ISocialLinks, TUserRole } from "@/@typings/user";

export interface IGetUserResponse {
  id?: string;
  email: string;
  username: string;
  avatar: string;
  userRole: TUserRole;
  socialLinks?: ISocialLinks | undefined;
  favoriteAmount?: number;
  commentAmount?: number;
}

export interface IRegisterResponse {
  user: IGetUserResponse;
  sessionToken: string;
}
