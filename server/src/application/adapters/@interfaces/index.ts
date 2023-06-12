import { TUserRole } from "@/@typings/user";

export interface IUserTokenInfo {
  user_id: string;
  email: string;
  type: TUserRole;
  username: string;
  avatarId: string;
  iat?: number;
  exp?: number;
}

export interface IPluginJWT {
  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options: { expiresIn: string },
  ): string;
  verify(token: string, secretOrPublicKey: string): object | string;
}

export interface IPluginSendMail {
  sendMail(data: {
    subject: string;
    from: string;
    to: string;
    text: string;
    html: string;
  }): Promise<void>;
}

export interface ISessionTokenAdapter {
  createSessionToken(data: { user_id: string; email: string }): string;
  verifySessionToken(token: string): IUserTokenInfo | false;
}

export interface ISendMailAdapter {
  verifyEmail(request: {
    email: string;
    randomSixDigitCode: number;
  }): Promise<void>;
}
