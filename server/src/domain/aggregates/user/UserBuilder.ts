import { randomUUID } from "node:crypto";
import type { ISocialLinks, TUserRole } from "@typings/user";
import { User } from ".";
import { Validators } from "./helpers";

export class UserBuilder {
  #id: string;
  #email: string;
  #username: string;
  #password: string | undefined;
  #avatar: string | undefined;
  #userRole: TUserRole;
  #socialLinks: ISocialLinks | undefined;

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
    Validators.validateUserRole(userRole);
    this.#userRole = userRole;
    return this;
  }

  public setSocialLinks(socialLinks: ISocialLinks | undefined): UserBuilder {
    this.#socialLinks = socialLinks;
    return this;
  }

  public build(): User {
    return new User({
      id: this.#id ?? randomUUID(),
      email: this.#email,
      username: this.#username,
      password: this.#password,
      avatar: this.#avatar ?? "Favatar02",
      userRole: this.#userRole ?? "reader",
      socialLinks: this.#socialLinks,
    });
  }
}
