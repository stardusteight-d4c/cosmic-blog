import { randomUUID } from "node:crypto";
import { ISocialLinks, User, TUserRole } from ".";
import Validators from "@/utils/validators";
import { Post } from "@domain/post";
import { Comment } from "@domain/comment";
import { Favorite } from "@domain/favorite";

export default class UserBuilder {
  #id: string | undefined;
  #email: string | undefined;
  #username: string | undefined;
  #password: string | undefined;
  #avatar: string | undefined;
  #userRole: TUserRole | undefined;
  #socialLinks: ISocialLinks | undefined = undefined;
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

  public setAvatar(avatar: string): UserBuilder {
    this.#avatar = avatar;
    return this;
  }

  public setFavoritedPosts(favoritedPosts: Favorite[]): UserBuilder {
    this.#favoritedPosts = favoritedPosts;
    return this;
  }

  public setCommentedPosts(commentedPosts: Comment[]): UserBuilder {
    this.#commentedPosts = commentedPosts;
    return this;
  }

  public setPublishedPosts(publishedPosts: Post[]): UserBuilder {
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
      avatar: this.#avatar,
      userRole: this.#userRole ?? "default-user",
      socialLinks: this.#socialLinks,
      favoritedPosts: this.#favoritedPosts.map((post) => post.reflect),
      commentedPosts: this.#commentedPosts.map((comment) => comment.reflect),
      publishedPosts: this.#publishedPosts.map((post) => post.reflect),
    });
  }
}
