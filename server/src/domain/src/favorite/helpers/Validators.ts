import { err } from "./errors";

namespace Validators {
  export function validatePostId(postId: string): void {
    if (!postId) {
      throw new Error(err.postIdRequired);
    }
  }

  export function validateUserId(userId: string): void {
    if (!userId) {
      throw new Error(err.userIdRequired);
    }
  }
}

export default Validators;
