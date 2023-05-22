import { Post } from "@domain/post";
import { Comment } from "@domain/comment";
import { ISocialLinks, IUserReflectObject, TUserRole } from ".";
import { Favorite, IFavoriteReflectObject } from "@/domain/@object-values/favorite";

export class User {
  #id: string;
  #email: string;
  #username: string;
  #password: string;
  #avatar: string;
  #userRole: TUserRole;
  #socialLinks: ISocialLinks | undefined;
  #favoritedPosts: Favorite[] = [];
  #commentedPosts: Comment[] = [];
  #publishedPosts: Post[] = [];

  constructor(properties: IUserReflectObject) {
    this.#id = properties.id!;
    this.#email = properties.email;
    this.#username = properties.username;
    this.#password = properties.password;
    this.#avatar = properties.avatar!;
    this.#userRole = properties.userRole!;
    this.#socialLinks = properties.socialLinks;
    this.#favoritedPosts = properties.favoritedPosts
      ? properties.favoritedPosts.map((favorite) => new Favorite(favorite))
      : [];
    this.#commentedPosts = properties.commentedPosts
      ? properties.commentedPosts.map((favorite) => new Comment(favorite))
      : [];
    this.#publishedPosts = properties.publishedPosts
      ? properties.publishedPosts.map((favorite) => new Post(favorite))
      : [];
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
      favoritedPosts: this.#favoritedPosts.map((favorite) => favorite.reflect),
      commentedPosts: this.#commentedPosts.map((comment) => comment.reflect),
      publishedPosts: this.#publishedPosts.map((post) => post.reflect),
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
    throw new Error("Cannot modify id property directly.");
  }

  public get type(): string {
    throw new Error(
      "Cannot access type property directly. Use the reflect object in the User instead.",
    );
  }
  public set type(_value: string) {
    throw new Error(
      "Cannot modify user type property directly. Use the changeRole method in the UserService instead.",
    );
  }

  public get email(): string {
    throw new Error(
      "Cannot access email property directly. Use the reflect object in the User instead.",
    );
  }
  public set email(_value: string) {
    throw new Error(
      "Cannot modify email property directly. Use the changeEmail method in the UserService instead.",
    );
  }

  public get username(): string {
    throw new Error(
      "Cannot access username property directly. Use the reflect object in the User instead.",
    );
  }
  public set username(_value: string) {
    throw new Error(
      "Cannot modify username property directly. Use the changeUsername method in the UserService instead.",
    );
  }

  public get password(): string {
    throw new Error(
      "Cannot access password property directly. Use the reflect object in the User instead.",
    );
  }
  public set password(_value: string) {
    throw new Error(
      "Cannot modify password property directly. Use the changePassword method in the UserService instead.",
    );
  }

  public get socialLinks(): Object[] {
    throw new Error(
      "Cannot access socialLinks property directly. Use the reflect object in the User instead.",
    );
  }
  public set socialLinks(_value: Object[]) {
    throw new Error(
      "Cannot modify socialLinks property directly. Use the editSocialLinks method in the UserService instead.",
    );
  }

  public get favoritedPosts(): IFavoriteReflectObject[] {
    throw new Error(
      "Cannot access favoritedPosts property directly. Use the reflect object in the User instead.",
    );
  }
  public set favoritedPosts(_value: IFavoriteReflectObject[]) {
    throw new Error("Cannot modify favoritedPosts property directly.");
  }
}
