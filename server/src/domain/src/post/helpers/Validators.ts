import { IUserReflectObject } from "@/@typings/user";
import { err } from "./errors";

namespace Validators {
  export function validateTitle(title: string): void {
    if (!title) {
      throw new Error(err.titleRequired);
    }
  }

  export function validateTags(tags: string[]): void {
    if (!tags) {
      throw new Error(err.tagsRequired);
    }
    if (tags && tags.length > 4) {
      throw new Error(err.maxTags);
    }
  }

  export function validateBody(body: string): void {
    if (!body) {
      throw new Error(err.bodyRequired);
    }
  }

  export function validateCoverImage(coverImage: string): void {
    if (!coverImage) {
      throw new Error(err.coverImageRequired);
    }
  }

  export function validatePostedAt(postedAt: Date): void {
    if (!postedAt) {
      throw new Error(err.postedAtRequired);
    }
  }

  export function validateAuthor(author: IUserReflectObject): void {
    if (!author) {
      throw new Error(err.authorRequired);
    }
    if (!author.id) {
      throw new Error(err.authorIdRequired);
    }
    if (!author.email) {
      throw new Error(err.authorEmailRequired);
    }
    if (!author.username) {
      throw new Error(err.authorUsernameRequired);
    }
    if (!author.avatar) {
      throw new Error(err.authorAvatarRequired);
    }
    if (author.userRole !== "author") {
      throw new Error(err.authorRoleRequired);
    }
  }
}

export default Validators;
