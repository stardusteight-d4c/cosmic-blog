import type { IPostReflectObject } from "@typings/post";
import { Post, PostBuilder } from "..";

export function postBuilderFactory(post: IPostReflectObject): Post {
  const updatedPostInstance = new PostBuilder()
    .setId(post.id)
    .setAuthor(post.author)
    .setCoverImage(post.coverImage)
    .setTitle(post.title)
    .setTags(post.tags)
    .setBody(post.body)
    .setPostedAt(post.postedAt)
    .setLastChange(post.lastChange)
    .build();
  return updatedPostInstance;
}
