import type { TUserRole } from "@typings/user";
import { userErrors } from "./errors";

namespace Validators {
  export function validateEmail(email: string): void {
    if (!email) {
      throw new Error(userErrors.emailRequired);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(userErrors.invalidEmail);
    }
  }

  export function validateUsername(username: string): void {
    if (!username) {
      throw new Error(userErrors.usernameRequired);
    }
    const regex = /^(?=.*[a-z])[a-z0-9]{3,}$/;
    const isValidUsername = regex.test(username);
    if (!isValidUsername) {
      throw new Error(userErrors.invalidUsername);
    }
  }

  export function validatePassword(password: string): void {
    if (!password) {
      throw new Error(userErrors.passwordRequired);
    }
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(userErrors.invalidPassword);
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

  export function validateUserRole(role: TUserRole): void {
    if (role != "reader" && role != "author") {
      throw new Error(userErrors.invalidUserRole);
    }
  }
}

export default Validators;
