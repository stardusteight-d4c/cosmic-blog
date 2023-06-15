import type { IPostReflectObject } from "@typings/post";
import { User } from "@domain/src/user";
import { getDate } from "./helpers/getDate";

export class Post {
  #id: string;
  #slug: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedAt: Date;
  #lastChange?: Date | undefined;
  #author: User;

  constructor(properties: IPostReflectObject) {
    this.#id = properties.id!;
    this.#title = properties.title;
    this.#slug = this.generateSlug();
    this.#body = properties.body;
    this.#tags = properties.tags;
    this.#coverImage = properties.coverImage;
    this.#postedAt = properties.postedAt;
    this.#lastChange = properties.lastChange;
    this.#author = new User(properties.author);
  }

  private generateSlug(): string {
    const sanitizedTitle = this.#title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `${sanitizedTitle}-${getDate()}`;
  }

  public get reflect(): IPostReflectObject {
    return {
      id: this.#id,
      title: this.#title,
      slug: this.#slug,
      body: this.#body,
      tags: this.#tags,
      coverImage: this.#coverImage,
      postedAt: this.#postedAt,
      lastChange: this.#lastChange,
      author: this.#author.reflect,
    };
  }

  public set reflect(_values: IPostReflectObject) {
    throw new Error(
      "Cannot modify reflect object directly. Use the PostService methods instead."
    );
  }
}
