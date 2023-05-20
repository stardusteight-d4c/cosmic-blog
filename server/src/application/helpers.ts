import { IJwt } from "./adapters/@interfaces";

export class MyJWT implements IJwt {
  sign(payload: string | object | Buffer, secretOrPrivateKey: string, options: { expiresIn: string; }): string {
    const jsonString = JSON.stringify(payload);
    return jsonString
  }
  verify(token: string, secretOrPublicKey: string): string | object {
    throw new Error("Method not implemented.");
  }
}