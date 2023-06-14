export interface IEncryptPasswordAdapter {
  encrypt(plainPassword: string): Promise<string>;
  compare(request: {
    plainPassword: string;
    hashedPassword: string;
  }): Promise<boolean>;
}
