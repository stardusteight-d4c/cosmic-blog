import { objectFactory } from "@domain/helpers";
import { describe, expect, it } from "vitest";
import { Favorite } from "../Favorite";

const factory = objectFactory();

describe("Comment", () => {
  it("must be not able to access the attributes directly", () => {
    const favorite = factory.getFavorite();
    const favoriteInstance = new Favorite(favorite);
    // @ts-ignore
    expect(favoriteInstance.postId).toBeUndefined();
    // @ts-ignore
    expect(favoriteInstance.userId).toBeUndefined();
  });

  it("must be not able to modify the attributes directly", () => {
    const favorite = factory.getFavorite();
    const favoriteInstance = new Favorite(favorite);
    // @ts-ignore
    favoriteInstance.postId = "57efe66a-ec8a-4043-9db9-bc40ce5a6a01";
    expect(favoriteInstance.reflect.postId).toStrictEqual(favorite.postId);
  });

  it("must be able to access the attributes via the <reflect> object", () => {
    const favorite = factory.getFavorite();
    const favoriteInstance = new Favorite(favorite);
    expect(favoriteInstance.reflect.postId).toStrictEqual(favorite.postId);
    expect(favoriteInstance.reflect.userId).toStrictEqual(favorite.userId);
  });
});
