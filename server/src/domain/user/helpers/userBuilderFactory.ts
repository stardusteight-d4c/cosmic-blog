import { IUserReflectObject, User, UserBuilder } from "@/domain/user";

export function userBuilderFactory({
  user,
  update,
}: {
  // userService
  user: IUserReflectObject;
  update?: {
    field: "email" | "password" | "favorites" | "comments" | "socialLinks";
    newData: any;
  };
}): User {
  // deve depender apenas do serviço de sua entidade
  const updatedUserInstance = new UserBuilder()
    .setId(user.id!)
    .setEmail(update?.field === "email" ? update.newData : user.email)
    .setUsername(user.username)
    .setPassword(update?.field === "password" ? update.newData : user.password)
    .setAvatar(user.avatar ?? undefined)
    .setUserRole(user.userRole ?? "default-user")
    .setSocialLinks(
      update?.field === "socialLinks" ? update.newData : user.socialLinks,
    )
    .setFavorites(
      update?.field === "favorites" ? update?.newData : user.favorites,
    )
    .setCommentedPosts(
      update?.field === "comments" ? update?.newData : user.commentedPosts,
    )
    .build();
  return updatedUserInstance;
}
