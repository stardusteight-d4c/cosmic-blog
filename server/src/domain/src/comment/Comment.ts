import { User } from "@domain/src/user";
import { ICommentReflectObject } from "./@interfaces/ICommentReflectObject";

export class Comment {
  #id: string;
  #postId: string;
  #postTitle: string;
  #owner: User;
  #content: string;
  #postedAt: Date;

  constructor(properties: ICommentReflectObject) {
    this.#id = properties.id!;
    this.#postTitle = properties.postTitle;
    this.#postId = properties.postId;
    this.#owner = new User(properties.owner);
    this.#content = properties.content;
    this.#postedAt = properties.postedAt;
  }

  public get reflect(): ICommentReflectObject {
    return {
      id: this.#id,
      postId: this.#postId,
      postTitle: this.#postTitle,
      owner: this.#owner.reflect,
      content: this.#content,
      postedAt: this.#postedAt,
    };
  }

  public canEdit(owner: User): boolean {
    const isAuthor = this.#owner.reflect.id === owner.reflect.id;
    return isAuthor;
  }

  public get id(): string {
    throw new Error(
      "Cannot access id property directly. Use the reflect object in the Comment instead.",
    );
  }
  public set id(_value: string) {
    throw new Error("Cannot modify id property directly.");
  }

  public get postId(): string {
    throw new Error(
      "Cannot access postId property directly. Use the reflect object in the Comment instead.",
    );
  }
  public set postId(_value: string) {
    throw new Error("Cannot modify postId property directly.");
  }


  public get postTitle(): string {
    throw new Error(
      "Cannot access postTitle property directly. Use the reflect object in the Comment instead.",
    );
  }
  public set postTitle(_value: string) {
    throw new Error("Cannot modify postTitle property directly.");
  }


  public get owner(): string {
    throw new Error(
      "Cannot access owner property directly. Use the reflect object in the Comment instead.",
    );
  }
  public set owner(_value: string) {
    throw new Error("Cannot modify owner property directly.");
  }

  public get content(): string {
    throw new Error(
      "Cannot access content property directly. Use the reflect object in the Comment instead.",
    );
  }
  public set content(_value: string) {
    throw new Error("Cannot modify content property directly.");
  }

  public get postedAt(): string {
    throw new Error(
      "Cannot access postedAt property directly. Use the reflect object in the Comment instead.",
    );
  }
  public set postedAt(_value: string) {
    throw new Error("Cannot modify postedAt property directly.");
  }
}
