import { TUserRole } from "@/domain/src/user";

export interface IJwt {
  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options: { expiresIn: string },
  ): string;
  verify(token: string, secretOrPublicKey: string): object | string;
}

export interface ICreateSessionToken {
  createSessionToken(data: { user_id: string; email: string }): string;
}

export interface IVerifySessionToken {
  verifySessionToken(token: string): IUserTokenInfo;
}

export interface IUserTokenInfo {
  user_id: string;
  email: string;
  type: TUserRole;
  iat?: number;
  exp?: number;
}
