import { IJwt, IUserTokenInfo, IVerifySessionToken } from "./@interfaces";

export class VerifySessionTokenAdapter implements IVerifySessionToken {
  constructor(private jwt: IJwt) {}

  verifySessionToken(token: string): IUserTokenInfo {
    const decoded = this.jwt.verify(token, process.env.JWT_SECRET!);
    if (decoded) {
      return decoded as IUserTokenInfo;
    }
  }
}
