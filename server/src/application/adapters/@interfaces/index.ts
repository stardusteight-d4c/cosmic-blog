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
