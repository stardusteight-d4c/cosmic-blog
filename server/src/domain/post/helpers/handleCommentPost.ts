import { Comment } from "@/domain/comment";
import { postBuilderFactory } from "./postBuilderFactory";
import { IPostRepository } from "../@interfaces";

export async function handleCommentPost(params: {
  postRepository: IPostRepository;
  comment: Comment;
}) {
  const { postRepository, comment } = params;
  const post = await postRepository.findById(comment.reflect.postId);
  if (post) {
    const updatedPostComments = [
      ...(post.reflect.comments?.map(
        (comment) =>
          new Comment({
            id: comment.id,
            postId: comment.postId,
            owner: comment.owner,
            content: comment.content,
            postedAt: comment.postedAt,
          }),
      ) ?? []),
      comment,
    ];
    const updatedPost = postBuilderFactory({
      post: post.reflect,
      update: { field: "comments", newData: updatedPostComments },
    });
    await postRepository.update(updatedPost);
    return comment;
  } 
}
