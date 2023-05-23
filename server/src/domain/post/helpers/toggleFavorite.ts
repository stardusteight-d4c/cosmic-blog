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
    const index = post.reflect.favoritedBy!.findIndex((fav) => fav === userId);
    const isNotFavorited = index === -1;
    if (isNotFavorited) {
      post.reflect.favoritedBy?.push(userId);
      const updatedPostInstance = postBuilderFactory({
        post: post.reflect,
        update: { field: "favorites", newData: post.reflect.favoritedBy },
      });
      await postRepository.update(updatedPostInstance);
      return updatedPostInstance;
    } else {
      const updatedPostfavoritedBy = post.reflect.favoritedBy?.filter(
        (fav) => fav !== userId,
      );
      const updatedPostInstance = postBuilderFactory({
        post: post.reflect,
        update: { field: "favorites", newData: updatedPostfavoritedBy },
      });
      await postRepository.update(updatedPostInstance);
      return updatedPostInstance;
    }
  }
}
