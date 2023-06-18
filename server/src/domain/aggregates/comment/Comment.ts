import type {
  ICommentReflectObject,
  OwnerMetadata,
  PostMetadata,
} from "@typings/comment";

export class Comment {
  #id: string;
  #post: PostMetadata;
  #owner: OwnerMetadata;
  #content: string;
  #postedAt: Date;

  constructor(properties: ICommentReflectObject) {
    this.#id = properties.id;
    this.#post = properties.post;
    this.#owner = properties.owner;
    this.#content = properties.content;
    this.#postedAt = properties.postedAt;
  }

  public get reflect(): ICommentReflectObject {
    return {
      id: this.#id,
      post: this.#post,
      owner: this.#owner,
      content: this.#content,
      postedAt: this.#postedAt,
    };
  }
}
