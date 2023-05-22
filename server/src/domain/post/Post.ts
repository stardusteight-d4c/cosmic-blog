import { IPostReflectObject } from ".";
import { User } from "@domain/user";
import { Comment } from "@domain/comment";
import { Favorite } from "@/domain/@object-values/favorite";

export class Post {
  #id: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedIn: Date;
  #lastChange?: Date | undefined;
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

  public set reflect(_values: IPostReflectObject) {
    throw new Error(
      "Cannot modify reflect object directly. Use the PostService methods instead.",
    );
  }

  public get id(): string {
    throw new Error(
      "Cannot access id property directly. Use the reflect object in the Post instead.",
    );
  }
  public set id(_value: string) {
    throw new Error("Cannot modify id property directly.");
  }

  public get title(): string {
    throw new Error(
      "Cannot access title property directly. Use the reflect object in the Post instead.",
    );
  }
  public set title(_value: string) {
    throw new Error("Cannot modify title property directly.");
  }

  public get body(): string {
    throw new Error(
      "Cannot access body property directly. Use the reflect object in the Post instead.",
    );
  }
  public set body(_value: string) {
    throw new Error("Cannot modify body property directly.");
  }

  public get tags(): string[] {
    throw new Error(
      "Cannot access tags property directly. Use the reflect object in the Post instead.",
    );
  }
  public set tags(_value: string[]) {
    throw new Error("Cannot modify tags property directly.");
  }

  public get coverImage(): string {
    throw new Error(
      "Cannot access coverImage property directly. Use the reflect object in the Post instead.",
    );
  }
  public set coverImage(_value: string) {
    throw new Error("Cannot modify coverImage property directly.");
  }

  public get postedIn(): Date {
    throw new Error(
      "Cannot access postedIn property directly. Use the reflect object in the Post instead.",
    );
  }
  public set postedIn(_value: Date) {
    throw new Error("Cannot modify postedIn property directly.");
  }

  public get lastChange(): Date {
    throw new Error(
      "Cannot access lastChange property directly. Use the reflect object in the Post instead.",
    );
  }
  public set lastChange(_value: Date) {
    throw new Error("Cannot modify lastChange property directly.");
  }

  public get author(): User {
    throw new Error(
      "Cannot access author property directly. Use the reflect object in the Post instead.",
    );
  }
  public set author(_value: User) {
    throw new Error("Cannot modify author property directly.");
  }

  public get favorites(): Favorite[] {
    throw new Error(
      "Cannot access favorites property directly. Use the reflect object in the Post instead.",
    );
  }
  public set favorites(_value: Favorite[]) {
    throw new Error("Cannot modify favorites property directly.");
  }

  public get comments(): Comment[] {
    throw new Error(
      "Cannot access comments property directly. Use the reflect object in the Post instead.",
    );
  }
  public set comments(_value: Comment[]) {
    throw new Error("Cannot modify comments property directly.");
  }
}
