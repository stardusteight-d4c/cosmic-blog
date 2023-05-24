import { Comment } from "@/domain/comment";
import { postBuilderFactory } from "./postBuilderFactory";
import { IPostRepository } from "../@interfaces";

export async function handleCommentAmountPost(params: {
  postRepository: IPostRepository;
  comment: Comment;
  action: "sum" | "sub";
}) {
  const { postRepository, comment, action } = params;
  const post = await postRepository.findById(comment.reflect.postId);
  if (post) {
    let currentPostComments = Number(post.reflect.commentAmount!);
    if (action === "sum") {
      const updatedPostComments = (currentPostComments += 1);
      const updatedPost = postBuilderFactory({
        post: post.reflect,
        update: { field: "comments", newData: updatedPostComments },
      });
      await postRepository.update(updatedPost);
      return comment;
    } else if (action === 'sub') {
      const updatedPostComments = (currentPostComments -= 1);
      const updatedPost = postBuilderFactory({
        post: post.reflect,
        update: { field: "comments", newData: updatedPostComments },
      });
      await postRepository.update(updatedPost);
      return comment;
    }
  }
}
