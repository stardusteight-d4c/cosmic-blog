import { Comment } from "@/domain/comment";
import { IUserRepository } from "../@interfaces";
import { userBuilderFactory } from "./userBuilderFactory";

export async function handleCommentedPosts(params: {
  userRepository: IUserRepository;
  comment: Comment;
}) {
  const { userRepository, comment } = params;
  const user = await userRepository.findById(comment.reflect.owner.id!);
  if (user) {
    let currentCommentedPosts = Number(user.reflect.commentedPosts!);
    const updatedCommentedPosts = (currentCommentedPosts += 1);
    const updatedUser = userBuilderFactory({
      user: user.reflect,
      update: { field: "comments", newData: updatedCommentedPosts },
    });
    await userRepository.update(updatedUser);
    return comment;
  }
}
