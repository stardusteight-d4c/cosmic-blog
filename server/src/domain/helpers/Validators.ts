import { TUserRole } from "@/@typings/user";
import { err } from "../src/user/helpers/errors";

namespace Validators {
  export function validateEmail(email: string): void {
    if (!email) {
      throw new Error(err.emailRequired);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(err.invalidEmail);
    }
  }

  export function validateUsername(username: string): void {
    if (!username) {
      throw new Error(err.usernameRequired);
    }
    const regex = /^(?=.*[a-z])[a-z0-9]{3,}$/;
    const isValidUsername = regex.test(username);
    if (!isValidUsername) {
      throw new Error(err.invalidUsername);
    }
  }

  export function validatePassword(password: string): void {
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(err.invalidPassword);
    }
  }

  export function validateUserRole(role: TUserRole): void {
    if (role != "reader" && role != "author") {
      throw new Error(err.invalidUserRole);
    }
  }

  export function compareCurrentPassword(data: {
    inputPassword: string;
    currentPassword: string;
  }): void {
    if (data.inputPassword !== data.currentPassword) {
      throw new Error("Incorrect current password.");
    }
  }

  export function checkPrimitiveType(data: { validating: any; type: string }) {
    if (typeof data.validating !== data.type) {
      throw new Error(`The validating is not of type ${data.type}.`);
    }
  }
}

export default Validators;
