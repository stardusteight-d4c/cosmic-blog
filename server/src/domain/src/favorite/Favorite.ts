import type { IFavoriteReflectObject } from "@typings/favorite";

export class Favorite {
  #postId: string;
  #userId: string;

  constructor(properties: IFavoriteReflectObject) {
    this.#postId = properties.postId;
    this.#userId = properties.userId;
  }

  public get reflect(): IFavoriteReflectObject {
    return {
      postId: this.#postId,
      userId: this.#userId,
    };
  }
}
