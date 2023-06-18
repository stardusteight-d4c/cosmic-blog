import { OwnerMetadata, PostMetadata } from "@typings/comment";
import { commentErrors } from "./errors";

namespace Validators {
  export function validatePost(post: PostMetadata): void {
    if (!post) {
      throw new Error(commentErrors.postRequired);
    }
    if (!post.slug) {
      throw new Error(commentErrors.postSlugRequired);
    }
    if (!post.title) {
      throw new Error(commentErrors.postTitleRequired);
    }
    if (!post.id) {
      throw new Error(commentErrors.postIdRequired);
    }
  }

  export function validateOwner(owner: OwnerMetadata): void {
    if (!owner) {
      throw new Error(commentErrors.ownerRequired);
    }
    if (!owner.id) {
      throw new Error(commentErrors.ownerIdRequired);
    }
    if (!owner.username) {
      throw new Error(commentErrors.ownerUsernameRequired);
    }
    if (!owner.avatar) {
      throw new Error(commentErrors.ownerAvatarRequired);
    }
  }

  export function validateContent(content: string): void {
    if (!content) {
      throw new Error(commentErrors.contentRequired);
    }
    if (content.length > 500) {
      throw new Error(commentErrors.charactersLimitExceed);
    }
  }

  export function validatePostedAt(postedAt: Date): void {
    if (!postedAt) {
      throw new Error(commentErrors.postedAtRequired);
    }
  }
}

export default Validators;
