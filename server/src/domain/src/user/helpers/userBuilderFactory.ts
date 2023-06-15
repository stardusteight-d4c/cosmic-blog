import type { IUserReflectObject } from "@typings/user";
import { User, UserBuilder } from "@domain/src/user";

export function userBuilderFactory({
  user,
}: {
  user: IUserReflectObject;
}): User {
  const updatedUserInstance = new UserBuilder()
    .setId(user.id)
    .setEmail(user.email)
    .setUsername(user.username)
    .setPassword(user.password)
    .setAvatar(user.avatar ?? undefined)
    .setUserRole(user.userRole ?? "reader")
    .setSocialLinks(user.socialLinks)
    .build();
  return updatedUserInstance;
}
