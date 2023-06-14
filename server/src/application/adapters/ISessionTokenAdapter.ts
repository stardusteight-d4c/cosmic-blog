import { TUserRole } from "@typings/user";

export interface IUserTokenInfo {
  user_id: string;
  email: string;
  type: TUserRole;
  username: string;
  avatarId: string;
  iat?: number;
  exp?: number;
}

export interface ISessionTokenAdapter {
  createSessionToken(data: IUserTokenInfo): string;
  verifySessionToken(token: string): IUserTokenInfo | false;
}
