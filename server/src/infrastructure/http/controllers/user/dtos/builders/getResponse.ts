import { IUserReflectObject } from "@/@typings/user";
import { IGetUserResponse } from "..";
import { UserController } from "../../user.controller";

export async function getUserResponse(request: {
  controller: UserController;
  user: IUserReflectObject;
}): Promise<{ user: IGetUserResponse }> {
  const { controller, user } = request;
  delete user.password;
  return {
    user: {
      ...(user as IGetUserResponse),
      favoriteAmount: await controller.getFavoriteAmount(user.id),
      commentAmount: await controller.getCommentAmount(user.id),
    },
  };
}