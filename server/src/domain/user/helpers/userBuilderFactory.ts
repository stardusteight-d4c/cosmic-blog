import { IUserReflectObject, User, UserBuilder } from "@/domain/user";

export function userBuilderFactory({
  user,
  update,
}: {
  user: IUserReflectObject;
  update?: {
    field: "email" | "password" | "favorites";
    newData: any;
  };
}): User {
  const updatedUserInstance = new UserBuilder()
    .setId(user.id!)
    .setEmail(update?.field === "email" ? update.newData : user.email)
    .setUsername(user.username)
    .setPassword(update?.field === "password" ? update.newData : user.password)
    .setAvatar(user.avatar ?? undefined)
    .setUserRole(user.userRole ?? "default-user")
    .setSocialLinks(user.socialLinks)
    .setFavorites(
      update?.field === "favorites" ? update?.newData : user.favorites,
    )
    .build();

  return updatedUserInstance;
}
