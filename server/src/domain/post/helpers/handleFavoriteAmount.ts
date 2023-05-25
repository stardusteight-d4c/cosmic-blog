import { Favorite } from "@/domain/favorite";
import { IPostRepository } from "../@interfaces";
import { postBuilderFactory } from "./postBuilderFactory";

export async function handleFavoriteAmount(params: {
  postRepository: IPostRepository;
  favorite: Favorite;
  operation: "create" | "delete";
}) {
  const { postRepository, favorite, operation } = params;
  const post = await postRepository.findById(favorite.reflect.postId);
  if (post) {
    let currentPostFavorites = Number(post.reflect.favoriteAmount!);
    if (operation === "create") {
      const updatedPostFavorites = (currentPostFavorites += 1);
      const updatedPost = postBuilderFactory({
        post: post.reflect,
        update: { field: "favorites", newData: updatedPostFavorites },
      });
      await postRepository.update(updatedPost);
      return favorite;
    } else if (operation === "delete") {
      const updatedPostFavorites = (currentPostFavorites -= 1);
      const updatedPost = postBuilderFactory({
        post: post.reflect,
        update: { field: "favorites", newData: updatedPostFavorites },
      });
      await postRepository.update(updatedPost);
      return favorite;
    }
  }
}
