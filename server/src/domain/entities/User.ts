import { Comment, CommentObject } from "./Comment";
import { Favorite, FavoriteObject } from "./Favorite";
import { Post, PostObject } from "./Post";

export type userRole = "author-blog" | "default-user";

export interface UserReflectObject {
  id?: string;
  email: string;
  username: string;
  password: string;
  type?: userRole;
  favoritedPosts?: FavoriteObject[];
  commentedPosts?: CommentObject[];
  publishedPosts?: PostObject[];
}

export interface UserRepository {
  createUser(user: User): Promise<User>;
  deleteUser(userId: string): Promise<User>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  changeEmail(updatedUser: User): Promise<User>;
  changePassword(updatedUser: User): Promise<User>;
  toggleFavorite(userId: string, postId: string): Promise<void>;
}

export class User {
  #id: string;
  #email: string;
  #username: string;
  #password: string;
  #type: userRole;
  #favoritedPosts: Favorite[] = [];
  #commentedPosts: Comment[] = [];
  #publishedPosts: Post[] = [];

  constructor(properties: UserReflectObject) {
    this.#id = properties.id!;
    this.#email = properties.email;
    this.#username = properties.username;
    this.#password = properties.password;
    this.#type = properties.type!;
  }

  public get reflect(): UserReflectObject {
    return {
      id: this.#id,
      email: this.#email,
      username: this.#username,
      password: this.#password,
      type: this.#type,
      favoritedPosts: this.#favoritedPosts.map((post) => post.object),
      commentedPosts: this.#commentedPosts.map((comment) => comment.object),
      publishedPosts: this.#publishedPosts.map((post) => post.object),
    };
  }
  public set reflect(_values: UserReflectObject) {
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
    return this.#username;
  }
  public set username(_value: string) {
    throw new Error(
      "Cannot modify username property directly. Use the changeUsername method in the UserService instead.",
    );
  }

  public get password(): string {
    return this.#password;
  }
  public set password(_value: string) {
    throw new Error(
      "Cannot modify password property directly. Use the changePassword method in the UserService instead.",
    );
  }

  public get type(): string {
    return this.#type;
  }
  public set type(_value: string) {
    throw new Error(
      "Cannot modify user type property directly. Use the changeRole method in the UserService instead.",
    );
  }

  public get favoritedPosts(): FavoriteObject[] {
    return this.#favoritedPosts.map((post) => post.object);
  }
  public set favoritedPosts(_value: FavoriteObject[]) {
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
