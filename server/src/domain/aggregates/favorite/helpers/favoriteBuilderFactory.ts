import type { IFavoriteReflectObject } from "@typings/favorite";
import { FavoriteBuilder } from "../FavoriteBuilder";
import { Favorite } from "../Favorite";

export function favoriteBuilderFactory(
  favorite: IFavoriteReflectObject
): Favorite {
  const updatedFavoriteInstance = new FavoriteBuilder()
    .setPostId(favorite.postId)
    .setUserId(favorite.userId)
    .build();
  return updatedFavoriteInstance;
}
