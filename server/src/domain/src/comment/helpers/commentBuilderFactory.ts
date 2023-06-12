import type { ICommentReflectObject } from "@typings/comment";
import { Comment, CommentBuilder } from "..";

export function commentBuilderFactory({
  comment,
  update,
}: {
  comment: ICommentReflectObject;
  update?: {
    field: "content";
    newData: any;
  };
}): Comment {
  const updatedCommentInstance = new CommentBuilder()
    .setId(comment.id!)
    .setPostId(comment.postId)
    .setPostTitle(comment.postTitle)
    .setOwner(comment.owner)
    .setContent(update?.field === "content" ? update.newData : comment.content)
    .setpostedAt(comment.postedAt)
    .build();
  return updatedCommentInstance;
}
