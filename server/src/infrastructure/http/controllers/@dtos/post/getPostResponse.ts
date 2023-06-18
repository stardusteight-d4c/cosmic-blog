import { IPostReflectObject } from "@typings/post";
import { JWTSessionTokenAdapter } from "@infra/adapters";
import { PostController } from "../../post/post.controller";

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
