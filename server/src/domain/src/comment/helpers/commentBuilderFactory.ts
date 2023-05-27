import { Comment, CommentBuilder, ICommentReflectObject } from "..";

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
    .setOwner(comment.owner)
    .setContent(update?.field === "content" ? update.newData : comment.content)
    .setpostedAt(comment.postedAt)
    .build();
  return updatedCommentInstance;
}
