import { describe, expect, it } from "vitest";
import { objectFactory } from "@domain/helpers";
import { favoriteErrors, favoriteBuilderFactory } from "../helpers";
import { Favorite } from "../Favorite";

const factory = objectFactory();

describe("FavoriteBuilder", () => {
  it("must be able create an instance of Favorite", () => {
    const favorite = factory.getFavorite();
    expect(favoriteBuilderFactory(favorite)).toBeInstanceOf(Favorite);
  });

  it("must be able trigger an error if the postId is not informed", () => {
    const favorite = factory.getFavorite();
    delete favorite.postId;
    expect(() => favoriteBuilderFactory(favorite)).toThrowError(
      favoriteErrors.postIdRequired
    );
  });

  it("must be able trigger an error if the userId is not informed", () => {
    const favorite = factory.getFavorite();
    delete favorite.userId;
    expect(() => favoriteBuilderFactory(favorite)).toThrowError(
      favoriteErrors.userIdRequired
    );
  });
});
