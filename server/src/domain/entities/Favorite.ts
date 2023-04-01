export interface FavoriteObject {
  userId: string
  postId: string
}

export class Favorite {
  #userId: string
  #postId: string

  constructor(properties: FavoriteObject) {
    this.#userId = properties.userId
    this.#postId = properties.postId
  }

  get object(): FavoriteObject {
    return {
      userId: this.#userId,
      postId: this.#postId,
    }
  }

  public get userId(): string {
    return this.#userId
  }
  public set userId(_value: string) {
    throw new Error('Value object properties cannot be changed.')
  }

  public get postId(): string {
    return this.#postId
  }
  public set postId(_value: string) {
    throw new Error('Value object properties cannot be changed.')
  }
}
