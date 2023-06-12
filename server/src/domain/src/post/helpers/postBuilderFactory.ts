import type { IPostReflectObject } from "@/@typings/post";
import { Post } from "../Post";
import { PostBuilder } from "../PostBuilder";

export function postBuilderFactory({
  post,
}: {
  post: IPostReflectObject;
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
    .build();
  return updatedPostInstance;
}
