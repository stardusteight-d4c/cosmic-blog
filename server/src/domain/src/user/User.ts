import type {
  ISocialLinks,
  IUserReflectObject,
  TUserRole,
} from "@typings/user";

export class User {
  #id: string;
  #email: string;
  #username: string;
  #password: string;
  #avatar: string;
  #userRole: TUserRole;
  #socialLinks: ISocialLinks | undefined;

  constructor(properties: IUserReflectObject) {
    this.#id = properties.id;
    this.#email = properties.email;
    this.#username = properties.username;
    this.#password = properties.password;
    this.#avatar = properties.avatar;
    this.#userRole = properties.userRole;
    this.#socialLinks = properties.socialLinks;
  }

  public get reflect(): IUserReflectObject {
    return {
      id: this.#id,
      email: this.#email,
      username: this.#username,
      password: this.#password,
      avatar: this.#avatar,
      userRole: this.#userRole,
      socialLinks: this.#socialLinks,
    };
  }
  public set reflect(_values: IUserReflectObject) {
    throw new Error(
      "Cannot modify reflect object directly. Use the UserService methods instead."
    );
  }
}
