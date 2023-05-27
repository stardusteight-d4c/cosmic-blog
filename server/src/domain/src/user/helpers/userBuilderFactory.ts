import { IUserReflectObject, User, UserBuilder } from "@domain/src/user";

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
    .build();
  return updatedUserInstance;
}
