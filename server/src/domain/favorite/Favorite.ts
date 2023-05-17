import { IFavoriteReflectObject } from ".";

export default class Favorite {
  #userId: string;
  #postId: string;

  constructor(properties: IFavoriteReflectObject) {
    this.#userId = properties.userId;
    this.#postId = properties.postId;
  }

  get reflect(): IFavoriteReflectObject {
    return {
      userId: this.#userId,
      postId: this.#postId,
    };
  }

  public get userId(): string {
    return this.#userId;
  }
  public set userId(_value: string) {
    throw new Error("Value object properties cannot be changed.");
  }

  public get postId(): string {
    return this.#postId;
  }
  public set postId(_value: string) {
    throw new Error("Value object properties cannot be changed.");
  }
}
