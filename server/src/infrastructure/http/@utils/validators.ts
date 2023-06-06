import { UserController } from "../controllers/user/user.controller";

namespace Validators {
  export function isSameUser(request: {
    controller: UserController;
    authToken: string;
    userId: string;
  }): void {
    const { controller, authToken, userId } = request;
    const decoded =
      controller.sessionTokenAdapter.verifySessionToken(authToken);
    if (decoded && decoded.user_id != userId) {
      throw new Error(
        `the session user is different from the user being updated`,
      );
    }
  }

  export function isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return false
    } else {
      return true
    }
  }

}

export default Validators;
