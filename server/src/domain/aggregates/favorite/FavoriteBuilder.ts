import { Favorite } from "./Favorite";
import { Validators } from "./helpers";

export class FavoriteBuilder {
  #postId: string;
  #userId: string;

  public setPostId(postId: string): FavoriteBuilder {
    Validators.validatePostId(postId);
    this.#postId = postId;
    return this;
  }

  public setUserId(userId: string): FavoriteBuilder {
    Validators.validateUserId(userId);
    this.#userId = userId;
    return this;
  }

  public build(): Favorite {
    return new Favorite({
      postId: this.#postId,
      userId: this.#userId,
    });
  }
}
