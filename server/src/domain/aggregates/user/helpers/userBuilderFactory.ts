import type { IUserReflectObject } from "@typings/user";
import { User, UserBuilder } from "@domain/aggregates/user";

export function userBuilderFactory(user: IUserReflectObject): User {
  const updatedUserInstance = new UserBuilder()
    .setId(user.id)
    .setEmail(user.email)
    .setUsername(user.username)
    .setPassword(user.password)
    .setAvatar(user.avatar)
    .setUserRole(user.userRole)
    .setSocialLinks(user.socialLinks)
    .build();
  return updatedUserInstance;
}
