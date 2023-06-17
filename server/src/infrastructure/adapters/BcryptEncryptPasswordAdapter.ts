import { IEncryptPasswordAdapter } from "@app/adapters";
import bcrypt from "bcrypt";

export class BcryptEncryptPasswordAdapter implements IEncryptPasswordAdapter {
  constructor() {}

  async encrypt(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, 10);
  }

  async compare(request: {
    plainPassword: string;
    hashedPassword: string;
  }): Promise<boolean> {
    const { plainPassword, hashedPassword } = request;
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
