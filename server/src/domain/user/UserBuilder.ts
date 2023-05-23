import { randomUUID } from "node:crypto";
import { ISocialLinks, User, TUserRole } from ".";
import Validators from "@/domain/@utils/validators";

export class UserBuilder {
  #id: string;
  #email: string;
  #username: string;
  #password: string;
  #avatar: string | undefined;
  #userRole: TUserRole;
  #socialLinks: ISocialLinks | undefined;
  #favorites: string[] = [];

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

  public setFavorites(favorites: string[]): UserBuilder {
    this.#favorites = favorites;
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
      favorites: this.#favorites ?? []
    });
  }
}
