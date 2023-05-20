import { IUserReflectObject, User, UserBuilder } from "@/domain/user";
import { Favorite } from "@/domain/favorite";
import { Comment } from "@/domain/comment";

export function userBuilderFactory({
  user,
  update,
}: {
  user: IUserReflectObject;
  update?: { field: "favorites" | "comments"; newData: any };
}): User {
  const updatedUserInstance = new UserBuilder()
  .setId(user.id!)
  .setEmail(user.email)
  .setUsername(user.username)
  .setPassword(user.password)
  .setFavoritedPosts(user.favoritedPosts)
  .build();
   
  return updatedUserInstance;
}
