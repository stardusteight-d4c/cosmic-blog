import { Comment, CommentReflectObject } from "./Comment";
import { Favorite, FavoriteReflectObject } from "./Favorite";
import { Post, PostReflectObject } from "./Post";

export type TUserRole = "author-blog" | "default-user";

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
}

export interface IUserReflectObject {
  id?: string;
  email: string;
  username: string;
  password: string;
  userRole?: TUserRole;
  socialLinks?: ISocialLinks | undefined;
  favoritedPosts?: FavoriteReflectObject[];
  commentedPosts?: CommentReflectObject[];
  publishedPosts?: PostReflectObject[];
}

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  deleteUser(userId: string): Promise<User>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  changeEmail(updatedUser: User): Promise<User>;
  changePassword(updatedUser: User): Promise<User>;
  toggleFavorite(userId: string, postId: string): Promise<void>;
}

export interface IUserService {
  emit_favoritedThePost(userId: string, postId: string): Promise<void>;
  createUser(user: IUserReflectObject): Promise<User>;
  deleteUser(userId: string): Promise<User | undefined>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  changeEmail(data: {
    userId: string;
    confirmationPassword: string;
    newEmail: string;
  }): Promise<User | undefined>;
  changePassword(data: {
    userId: string;
    confirmationPassword: string;
    newPassword: string;
  }): Promise<User | undefined>;
}

export class User {
  #id: string;
  #email: string;
  #username: string;
  #password: string;
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
      userRole: this.#userRole,
      socialLinks: this.#socialLinks,
      favoritedPosts: this.#favoritedPosts.map((post) => post.reflect),
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

  public get favoritedPosts(): FavoriteReflectObject[] {
    throw new Error(
      "Cannot access favoritedPosts property directly. Use the reflect object in the User instead.",
    );
  }
  public set favoritedPosts(_value: FavoriteReflectObject[]) {
    throw new Error("Cannot modify favoritedPosts property directly.");
  }

  // public toggleFavorite(postId: string): void {
  //   if (typeof postId !== 'string') {
  //     throw new Error('The parameter must be a String.')
  //   }
  //   // mover allPosts para um PostService
  //   const post = Post.allPosts.find((post) => post.id === postId)
  //   if (!post) {
  //     throw new Error(`No post found with id: ${postId}`)
  //   }
  //   const index = this.#favoritedPosts.findIndex(
  //     (favorite) => favorite.postId === postId
  //   )
  //   if (index === -1) {
  //     this.#favoritedPosts.push(new Favorite({ userId: this.#id, postId }))
  //   } else {
  //     this.#favoritedPosts.splice(index, 1)
  //   }
  // }
}
