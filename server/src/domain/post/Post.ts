import { IPostReflectObject } from ".";
import { User } from "@domain/user";
import { Comment } from "@domain/comment";
import { Favorite } from "@domain/favorite";

export default class Post {
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

  constructor(properties: IPostReflectObject) {
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

  public get reflect(): IPostReflectObject {
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
}