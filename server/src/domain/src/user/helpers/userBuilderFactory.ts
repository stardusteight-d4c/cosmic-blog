import type { IUserReflectObject } from "@typings/user";
import { User, UserBuilder } from "@domain/src/user";

export function userBuilderFactory({
  user,
  update,
}: {
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
    .setUserRole(user.userRole ?? "reader")
    .setSocialLinks(
      update?.field === "socialLinks" ? update.newData : user.socialLinks,
    )
    .build();
  return updatedUserInstance;
}
