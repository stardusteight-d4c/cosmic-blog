import type { ICommentReflectObject } from "@typings/comment";
import { Comment, CommentBuilder } from "..";

export function commentBuilderFactory(comment: ICommentReflectObject): Comment {
  const updatedCommentInstance = new CommentBuilder()
    .setId(comment.id)
    .setPost(comment.post)
    .setOwner(comment.owner)
    .setContent(comment.content)
    .setPostedAt(comment.postedAt)
    .build();
  return updatedCommentInstance;
}
