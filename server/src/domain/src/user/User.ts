import type { ISocialLinks, IUserReflectObject, TUserRole } from "@typings/user";

export class User {
  #id: string;
  #email: string;
  #username: string;
  #password: string;
  #avatar: string;
  #userRole: TUserRole;
  #socialLinks: ISocialLinks | undefined;

  constructor(properties: IUserReflectObject) {
    this.#id = properties.id!;
    this.#email = properties.email;
    this.#username = properties.username;
    this.#password = properties.password;
    this.#avatar = properties.avatar!;
    this.#userRole = properties.userRole!;
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
      "Cannot modify reflect object directly. Use the UserService methods instead.",
    );
  }

  public get id(): string {
    throw new Error(
      "Cannot access id property directly. Use the reflect object in the User instead.",
    );
  }
  public set id(_value: string) {
    throw new Error("Cannot modify id");
  }

  public get type(): string {
    throw new Error(
      "Cannot access type property directly. Use the reflect object in the User instead.",
    );
  }
  public set type(_value: string) {
    throw new Error(
      "Cannot modify user type property directly. Use the UserService instead.",
    );
  }

  public get email(): string {
    throw new Error(
      "Cannot access email property directly. Use the reflect object in the User instead.",
    );
  }
  public set email(_value: string) {
    throw new Error(
      "Cannot modify email property directly. Use the UserService instead.",
    );
  }

  public get username(): string {
    throw new Error(
      "Cannot access username property directly. Use the reflect object in the User instead.",
    );
  }
  public set username(_value: string) {
    throw new Error(
      "Cannot modify username property directly. Use the UserService instead.",
    );
  }

  public get password(): string {
    throw new Error(
      "Cannot access password property directly. Use the reflect object in the User instead.",
    );
  }
  public set password(_value: string) {
    throw new Error(
      "Cannot modify password property directly. Use the UserService instead.",
    );
  }

  public get socialLinks(): Object[] {
    throw new Error(
      "Cannot access socialLinks property directly. Use the reflect object in the User instead.",
    );
  }
  public set socialLinks(_value: Object[]) {
    throw new Error(
      "Cannot modify socialLinks property directly. Use the UserService instead.",
    );
  }
}
