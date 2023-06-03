import { IPluginJWT, IUserTokenInfo } from "../adapters/@interfaces";

export class MyPluginJWT implements IPluginJWT {
  sign(
    payload: string | object | Buffer,
    secretOrPrivateKey: string,
    options: { expiresIn: string },
  ): string {
    const jsonString = JSON.stringify(payload);
    return jsonString;
  }
  verify(token: string, secretOrPublicKey: string): string | object {
    const parsedToken: IUserTokenInfo = JSON.parse(token);
    return parsedToken;
  }
}