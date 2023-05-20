import { IUserReflectObject, User, UserBuilder } from "@/domain/user";
import { Favorite } from "@/domain/favorite";
import { Comment } from "@/domain/comment";
import { Post } from "@/domain/post";

export function userBuilderFactory({
  user,
  update,
}: {
  user: IUserReflectObject;
  update?: {
    field: "favorites" | "comments" | "posts";
    newData: any;
  };
}): User {
  const updatedUserInstance = new UserBuilder()
    .setId(user.id!)
    .setEmail(user.email)
    .setUsername(user.username)
    .setPassword(user.password)
    .setAvatar(user.avatar ?? undefined)
    .setUserRole(user.userRole ?? "default-user")
    .setSocialLinks(user.socialLinks)
    .setFavoritedPosts(
      update?.field === "favorites"
        ? update.newData!
        : user.favoritedPosts?.map((fav) => new Favorite(fav)),
    )
    .setCommentedPosts(
      update?.field === "comments"
        ? update.newData
        : user.commentedPosts?.map((comment) => new Comment(comment)),
    )
    .setPublishedPosts(
      update?.field === "posts"
        ? update.newData
        : user.publishedPosts?.map((post) => new Post(post)),
    )
    .build();

  return updatedUserInstance;
}
