import { TUserRole } from "@/domain/src/user";
import { ICreateSessionToken, IJwt, IUserTokenInfo } from "./@interfaces";

export class CreateSessionTokenAdapter implements ICreateSessionToken {
  constructor(private jwt: IJwt) {}
  
  createSessionToken(data: {
    user_id: string;
    email: string;
    type: TUserRole;
  }): string {
    const payload: IUserTokenInfo = {
      user_id: data.user_id,
      email: data.email,
      type: data.type,
    };
    const sessionToken = this.jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    return sessionToken;
  }
}
