import { SessionTokenAdapter } from "@/application/adapters/SessionTokenAdapter";
import { IPostReflectObject } from "@/domain/src/post";
import jwt from "jsonwebtoken";
import { PostController } from "../post.controller";

export async function buildGetByIdResponse(request: {
  controller: PostController;
  authToken: string;
  post: IPostReflectObject;
}) {
  const { controller, authToken, post } = request;
  let isAuthor: boolean;
  let isGuest: boolean;
  let isFavorited: boolean;
  const sessionTokenAdapter = new SessionTokenAdapter(jwt);
  const decoded = sessionTokenAdapter.verifySessionToken(authToken);
  isAuthor = false;
  isGuest = true;
  isFavorited = false;
  if (decoded) {
    isAuthor = decoded.user_id === post.author.id;
    isGuest = false;
    isFavorited = await controller.isFavoritedByUser({
      userId: decoded.user_id,
      postId: post.id,
    });
  }
  return {
    post,
    favoriteAmount: await controller.getFavoriteAmount(post.id),
    commentAmount: await controller.getCommentAmount(post.id),
    isAuthor,
    isGuest,
    isFavorited,
  };
}
