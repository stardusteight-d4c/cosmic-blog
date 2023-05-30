import { IJwt, IVerifySessionToken } from "./@interfaces";

export class VerifySessionTokenAdapter implements IVerifySessionToken {
  constructor(private jwt: IJwt) {}

  verifySessionToken(token: string): string {
    const decoded = this.jwt.verify(token, process.env.JWT_SECRET!);
    if (decoded) {
      return JSON.stringify(decoded);
    }
  }
}
