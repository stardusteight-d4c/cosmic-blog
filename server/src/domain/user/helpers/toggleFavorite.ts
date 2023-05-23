import { IUserRepository } from "../@interfaces";
import { userBuilderFactory } from "./userBuilderFactory";

export async function toggleFavorite(params: {
  userRepository: IUserRepository;
  postId: string;
  userId: string;
}) {
  const { userRepository, postId, userId } = params;
  const user = await userRepository.findById(userId);
  if (user) {
    const index = user.reflect.favorites!.findIndex((fav) => fav === postId);
    const isNotFavorited = index === -1;
    if (isNotFavorited) {
      user.reflect.favorites?.push(postId);
      const updatedUserInstance = userBuilderFactory({
        user: user.reflect,
        update: { field: "favorites", newData:  user.reflect.favorites },
      });
      await userRepository.update(updatedUserInstance);
      return updatedUserInstance;
    } else {
      const updatedUserFavorites = user.reflect.favorites?.filter(
        (fav) => fav !== postId,
      );
      const updatedUserInstance = userBuilderFactory({
        user: user.reflect,
        update: { field: "favorites", newData: updatedUserFavorites },
      });
      await userRepository.update(updatedUserInstance);
      return updatedUserInstance;
    }
  }
}
