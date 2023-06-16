import type { AuthorMetadata, IPostReflectObject } from "@typings/post";
import { getDate } from "./helpers";

export class Post {
  #id: string;
  #slug: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedAt: Date;
  #lastChange: Date | undefined;
  #author: AuthorMetadata;

  constructor(properties: IPostReflectObject) {
    this.#id = properties.id;
    this.#title = properties.title;
    this.#slug = this.generateSlug();
    this.#body = properties.body;
    this.#tags = properties.tags;
    this.#coverImage = properties.coverImage;
    this.#postedAt = properties.postedAt;
    this.#lastChange = properties.lastChange;
    this.#author = properties.author;
  }

  private generateSlug(): string | undefined {
    if (this.#title) {
      const sanitizedTitle = this.#title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return `${sanitizedTitle}-${getDate()}`;
    } else {
      return undefined;
    }
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
      author: this.#author,
    };
  }

  public set reflect(_values: IPostReflectObject) {
    throw new Error(
      "Cannot modify reflect object directly. Use the PostService methods instead."
    );
  }
}
