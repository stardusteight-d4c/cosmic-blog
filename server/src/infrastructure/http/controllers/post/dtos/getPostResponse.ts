import { PostController } from "../post.controller";
import { IPostReflectObject } from "@/@typings/post";
import { JWTSessionTokenAdapter } from "@/infrastructure/adapters";
import { IGetPostResponse } from ".";

export async function getPostResponse(request: {
  controller: PostController;
  authToken: string;
  post: IPostReflectObject;
}): Promise<IGetPostResponse> {
  const { controller, authToken, post } = request;
  let isAuthor: boolean;
  let isGuest: boolean;
  let isFavorited: boolean;
  const sessionTokenAdapter = new JWTSessionTokenAdapter();
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
    ...post,
    favoriteAmount: await controller.getFavoriteAmount(post.id),
    commentAmount: await controller.getCommentAmount(post.id),
    isAuthor,
    isGuest,
    isFavorited,
  } as IGetPostResponse;
}
