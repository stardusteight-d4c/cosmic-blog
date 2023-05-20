import { User } from "@/domain/user";
import { IPostReflectObject } from "../@interfaces";
import { Favorite } from "@/domain/favorite";
import { Comment } from "@/domain/comment";
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
    .setAuthor(new User(post.author))
    .setCoverImage(post.coverImage)
    .setTitle(post.title)
    .setTags(post.tags)
    .setBody(post.body)
    .setPostedIn(post.postedIn)
    .setLastChange(post.lastChange)
    .setFavorites(
      update?.field === "favorites"
        ? update.newData
        : post.favorites?.map((fav) => new Favorite(fav)),
    )
    .setComments(
      update?.field === "comments"
        ? update.newData
        : post.comments?.map((comment) => new Comment(comment)),
    )
    .build();
  return updatedPostInstance;
}