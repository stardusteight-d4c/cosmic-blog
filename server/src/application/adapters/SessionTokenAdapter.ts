import { TUserRole } from "@/domain/src/user";
import {
  IPluginJWT,
  ISessionTokenAdapter,
  IUserTokenInfo,
} from "./@interfaces";

export class SessionTokenAdapter implements ISessionTokenAdapter {
  #pluginJWT: IPluginJWT;

  constructor(pluginJWT: IPluginJWT) {
    this.#pluginJWT = pluginJWT;
  }

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
    const sessionToken = this.#pluginJWT.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );
    return sessionToken;
  }

  verifySessionToken(token: string): IUserTokenInfo | false {
    try {
      const decoded = this.#pluginJWT.verify(token, process.env.JWT_SECRET!);
      if (decoded) {
        return decoded as IUserTokenInfo;
      }
    } catch (error) {
      console.error("Erro na validação do token:", error);
    }
    return false;
  }
}
