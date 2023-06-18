import { favoriteErrors } from "./errors";

namespace Validators {
  export function validatePostId(postId: string): void {
    if (!postId) {
      throw new Error(favoriteErrors.postIdRequired);
    }
  }

  export function validateUserId(userId: string): void {
    if (!userId) {
      throw new Error(favoriteErrors.userIdRequired);
    }
  }
}

export default Validators;
