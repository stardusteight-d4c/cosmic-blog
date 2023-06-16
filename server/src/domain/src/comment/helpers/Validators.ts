import { OwnerMetadata, PostMetadata } from "@typings/comment";
import { err } from "./errors";

namespace Validators {
  export function validatePost(post: PostMetadata): void {
    if (!post) {
      throw new Error(err.postRequired);
    }
    if (!post.slug) {
      throw new Error(err.postSlugRequired);
    }
    if (!post.title) {
      throw new Error(err.postTitleRequired);
    }
    if (!post.id) {
      throw new Error(err.postIdRequired);
    }
  }

  export function validateOwner(owner: OwnerMetadata): void {
    if (!owner) {
      throw new Error(err.ownerRequired);
    }
    if (!owner.id) {
      throw new Error(err.ownerIdRequired);
    }
    if (!owner.username) {
      throw new Error(err.ownerUsernameRequired);
    }
    if (!owner.avatar) {
      throw new Error(err.ownerAvatarRequired);
    }
  }

  export function validateContent(content: string): void {
    if (!content) {
      throw new Error(err.contentRequired);
    }
    if (content.length > 500) {
      throw new Error(err.charactersLimitExceed);
    }
  }

  export function validatePostedAt(postedAt: Date): void {
    if (!postedAt) {
      throw new Error(err.postedAtRequired);
    }
  }
}

export default Validators;
