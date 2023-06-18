import { IPostReflectObject } from "@typings/post";
import { JWTSessionTokenAdapter } from "@infra/adapters";
import { PostController } from "../../post/post.controller";

export async function getPostResponse(request: {
  controller: PostController;
  authToken: string;
  post: IPostReflectObject;
}): Promise<IGetPostResponse> {
 return {} as any
}
