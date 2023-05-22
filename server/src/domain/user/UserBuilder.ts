import { randomUUID } from "node:crypto";
import { ISocialLinks, User, TUserRole } from ".";
import Validators from "@/domain/@utils/validators";
import { Post } from "@domain/post";
import { Comment } from "@domain/comment";
import { Favorite } from "@/domain/@object-values/favorite";

export class UserBuilder {
  #id: string;
  #email: string;
  #username: string;
  #password: string;
  #avatar: string | undefined;
  #userRole: TUserRole;
  #socialLinks: ISocialLinks | undefined;
  #favoritedPosts: Favorite[] = [];
  #commentedPosts: Comment[] = [];
  #publishedPosts: Post[] = [];

  public setId(id: string) {
    this.#id = id;
    return this;
  }

  public setEmail(email: string): UserBuilder {
    Validators.validateEmail(email);
    this.#email = email;
    return this;
  }

  public setUsername(username: string): UserBuilder {
    Validators.validateUsername(username);
    this.#username = username;
    return this;
  }

  public setPassword(password: string): UserBuilder {
    Validators.validatePassword(password);
    this.#password = password;
    return this;
  }

  public setAvatar(avatar: string | undefined): UserBuilder {
    this.#avatar = avatar;
    return this;
  }

  public setUserRole(userRole: TUserRole): UserBuilder {
    this.#userRole = userRole;
    return this;
  }

  public setSocialLinks(socialLinks: ISocialLinks | undefined): UserBuilder {
    this.#socialLinks = socialLinks;
    return this;
  }

  public setFavoritedPosts(favoritedPosts: Favorite[]): UserBuilder {
    if (favoritedPosts === undefined) {
      this.#favoritedPosts = [];
      return this;
    }
    this.#favoritedPosts = favoritedPosts;
    return this;
  }

  public setCommentedPosts(commentedPosts: Comment[]): UserBuilder {
    if (commentedPosts === undefined) {
      this.#commentedPosts = [];
      return this;
    }
    this.#commentedPosts = commentedPosts;
    return this;
  }

  public setPublishedPosts(publishedPosts: Post[]): UserBuilder {
    if (publishedPosts === undefined) {
      this.#publishedPosts = [];
      return this;
    }
    this.#publishedPosts = publishedPosts;
    return this;
  }

  public build(): User {
    if (!this.#email) {
      throw new Error("Email is required.");
    }
    if (!this.#username) {
      throw new Error("Username is required.");
    }
    if (!this.#password) {
      throw new Error("Password is required.");
    }
    return new User({
      id: this.#id || randomUUID(),
      email: this.#email,
      username: this.#username,
      password: this.#password,
      avatar: this.#avatar ?? "AVATAR01",
      userRole: this.#userRole ?? "default-user",
      socialLinks: this.#socialLinks,
      favoritedPosts: this.#favoritedPosts.map((post) => post.reflect),
      commentedPosts: this.#commentedPosts.map((comment) => comment.reflect),
      publishedPosts: this.#publishedPosts.map((post) => post.reflect),
    });
  }
}
