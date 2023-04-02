import { randomUUID } from "node:crypto";
import Validators from "../../utils/validators";
import { CommentObject } from "../entities/Comment";
import { FavoriteObject } from "../entities/Favorite";
import { PostObject } from "../entities/Post";
import { User, userRole } from "../entities/User";

export class UserBuilder {
  #id: string | undefined;
  #email: string | undefined;
  #username: string | undefined;
  #password: string | undefined;
  #type: userRole | undefined;
  #favoritedPosts: FavoriteObject[] = [];
  #commentedPosts: CommentObject[] = [];
  #publishedPosts: PostObject[] = [];

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
      type: this.#type ?? "default-user",
      favoritedPosts: this.#favoritedPosts,
      commentedPosts: this.#commentedPosts,
      publishedPosts: this.#publishedPosts,
    });
  }
}
