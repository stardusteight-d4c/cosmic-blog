import type { ICommentReflectObject } from "@typings/comment";
import { Comment, CommentBuilder } from "..";

export function commentBuilderFactory({
  comment,
  update,
}: {
  comment: ICommentReflectObject;
  update?: {
    field: "content" | "postedAt";
    newData: any;
  };
}): Comment {
  const updatedCommentInstance = new CommentBuilder()
    .setId(comment.id)
    .setPost(comment.post)
    .setOwner(comment.owner)
    .setContent(update?.field === "content" ? update.newData : comment.content)
    .setPostedAt(comment.postedAt)
    .build();
  return updatedCommentInstance;
}
