import { Comment, CommentReflectObject } from "./Comment";
import { Favorite, FavoriteReflectObject } from "./Favorite";
import { User, UserReflectObject } from "./User";

export interface PostReflectObject {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedIn: Date;
  lastChange?: Date;
  author: UserReflectObject;
  favorites?: FavoriteReflectObject[];
  comments?: CommentReflectObject[];
}

export class Post {
  #id: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedIn: Date;
  #lastChange?: Date;
  #author: User;
  #favorites: Favorite[] = [];
  #comments: Comment[] = [];

  constructor(properties: PostReflectObject) {
    this.#id = properties.id!;
    this.#title = properties.title;
    this.#body = properties.body;
    this.#tags = properties.tags;
    this.#coverImage = properties.coverImage;
    this.#postedIn = properties.postedIn;
    this.#lastChange = properties.lastChange;
    this.#author = new User(properties.author);
    this.#favorites = properties.favorites
      ? properties.favorites.map((favorite) => new Favorite(favorite))
      : [];
    this.#comments = properties.comments
      ? properties.comments.map((comment) => new Comment(comment))
      : [];
  }

  public get reflect(): PostReflectObject {
    return {
      id: this.#id,
      title: this.#title,
      body: this.#body,
      tags: this.#tags,
      coverImage: this.#coverImage,
      postedIn: this.#postedIn,
      lastChange: this.#lastChange,
      author: this.#author.reflect,
      favorites: this.#favorites.map((favorite) => favorite.reflect),
      comments: this.#comments.map((comment) => comment.reflect),
    };
  }

  // get tags(): string[] {
  //   return this._tags;
  // }

  // set tags(value: string[]) {
  //   if (value.length > 4) {
  //     throw new Error("The maximum number of tags allowed is 4.");
  //   }
  //   this._tags = value;
  // }

  // // public canEdit(author: User): boolean {
  // //   return this.author.id === author.id
  // // }
}
