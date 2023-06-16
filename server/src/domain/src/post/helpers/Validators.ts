import { AuthorMetadata } from "@typings/post";
import { postErrors } from "./errors";

namespace Validators {
  export function validateTitle(title: string): void {
    if (!title) {
      throw new Error(postErrors.titleRequired);
    }
  }

  export function validateTags(tags: string[]): void {
    if (!tags) {
      throw new Error(postErrors.tagsRequired);
    }
    if (tags && tags.length > 4) {
      throw new Error(postErrors.maxTags);
    }
  }

  export function validateBody(body: string): void {
    if (!body) {
      throw new Error(postErrors.bodyRequired);
    }
  }

  export function validateCoverImage(coverImage: string): void {
    if (!coverImage) {
      throw new Error(postErrors.coverImageRequired);
    }
  }

  export function validatePostedAt(postedAt: Date): void {
    if (!postedAt) {
      throw new Error(postErrors.postedAtRequired);
    }
  }

  export function validateAuthor(author: AuthorMetadata): void {
    if (!author) {
      throw new Error(postErrors.authorRequired);
    }
    if (!author.id) {
      throw new Error(postErrors.authorIdRequired);
    }
    if (!author.email) {
      throw new Error(postErrors.authorEmailRequired);
    }
    if (!author.username) {
      throw new Error(postErrors.authorUsernameRequired);
    }
    if (!author.avatar) {
      throw new Error(postErrors.authorAvatarRequired);
    }
    if (author.userRole !== "author") {
      throw new Error(postErrors.authorRoleRequired);
    }
  }
}

export default Validators;
