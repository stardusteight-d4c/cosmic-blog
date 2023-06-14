import {
  ISessionTokenAdapter,
  IUserTokenInfo,
} from "@app/adapters/ISessionTokenAdapter";
import jwt from "jsonwebtoken";

export class JWTSessionTokenAdapter implements ISessionTokenAdapter {
  constructor() {}

  createSessionToken(payload: IUserTokenInfo): string {
    const sessionToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return sessionToken;
  }

  verifySessionToken(token: string): IUserTokenInfo | false {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if (decoded) {
        return decoded as IUserTokenInfo;
      }
    } catch (error) {
      console.error("Token validation error:", error);
    }
    return false;
  }
}
