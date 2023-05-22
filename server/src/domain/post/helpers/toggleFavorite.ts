import { Favorite } from "@/domain/favorite";
import { IPostRepository } from "../@interfaces";
import { postBuilderFactory } from "./postBuilderFactory";

export async function toggleFavorite(params: {
  postRepository: IPostRepository;
  postId: string;
  userId: string;
}) {
  const { postRepository, postId, userId } = params;
  const post = await postRepository.findById(postId);
  if (post) {
    const index = post.reflect.favorites!.findIndex(
      (fav) => fav.userId === userId,
    );
    const isNotFavorited = index === -1;
    if (isNotFavorited) {
      const newFavorite = new Favorite({ userId, postId });
      const updatedPostFavorites = [
        ...(post.reflect.favorites?.map(
          (favorite) =>
            new Favorite({
              userId: favorite.userId,
              postId: favorite.postId,
            }),
        ) ?? []),
        newFavorite,
      ];
      const updatedPostInstance = postBuilderFactory({
        post: post.reflect,
        update: { field: "favorites", newData: updatedPostFavorites },
      });
      await postRepository.update(updatedPostInstance);
      return updatedPostInstance;
    } else {
      const updatedPostFavorites = post.reflect.favorites?.filter(
        (favorite) => favorite.postId !== postId,
      );
      const updatedPostInstance = postBuilderFactory({
        post: post.reflect,
        update: { field: "favorites", newData: updatedPostFavorites },
      });
      await postRepository.update(updatedPostInstance);
      return updatedPostInstance;
    }
  }
}
