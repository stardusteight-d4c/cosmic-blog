import { User } from "@/domain/user";
import { IPostReflectObject } from "../@interfaces";
import Post from "../Post";
import PostBuilder from "../PostBuilder";
import { Favorite } from "@/domain/favorite";
import { Comment } from "@/domain/comment";

export function builderFactory({
  post,
  update,
}: {
  post: IPostReflectObject;
  update?: { field: "favorites" | "comments"; newData: any };
}): Post {
  const updatedPostInstance = new PostBuilder()
    .setId(post.id!)
    .setTitle(post.title)
    .setBody(post.body)
    .setTags(post.tags)
    .setCoverImage(post.coverImage)
    .setPostedIn(post.postedIn)
    .setAuthor(new User(post.author))
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
