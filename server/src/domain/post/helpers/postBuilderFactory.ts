import { User } from "@/domain/user";
import { IPostReflectObject } from "../@interfaces";
import { Post } from "../Post";
import { PostBuilder } from "../PostBuilder";

export function postBuilderFactory({
  post,
  update,
}: {
  post: IPostReflectObject;
  update?: { field: "favorites" | "comments"; newData: any };
}): Post {
  const updatedPostInstance = new PostBuilder()
    .setId(post.id!)
    .setAuthor(post.author)
    .setCoverImage(post.coverImage)
    .setTitle(post.title)
    .setTags(post.tags)
    .setBody(post.body)
    .setPostedIn(post.postedIn)
    .setLastChange(post.lastChange)
    .setFavoriteAmount(
      update?.field === "favorites" ? update.newData : post.favoriteAmount,
    )
    .setCommentAmount(
      update?.field === "comments" ? update.newData : post.commentAmount,
    )
    .build();
  return updatedPostInstance;
}
