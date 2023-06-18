import { ISessionTokenAdapter } from "@/application/adapters";

namespace Validators {
  export function isSameUser(request: {
    sessionTokenAdapter: ISessionTokenAdapter;
    authToken: string;
    userId: string;
  }): void {
    const { sessionTokenAdapter, authToken, userId } = request;
    const decoded = sessionTokenAdapter.verifySessionToken(authToken);
    if (decoded && decoded.user_id != userId) {
      throw new Error(
        `authentication token does not match this user`
      );
    }
  }

  export function isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  }
}

export default Validators;
