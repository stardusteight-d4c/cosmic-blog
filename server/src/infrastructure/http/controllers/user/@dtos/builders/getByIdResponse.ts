import { IUserReflectObject } from "@/@typings/user";
import { IUserResponse } from "..";
import { UserController } from "../../user.controller";

export async function getByIdResponse(request: {
  controller: UserController;
  user: IUserReflectObject;
}): Promise<{ user: IUserResponse }> {
  const { controller, user } = request;
  delete user.password;
  return {
    user: {
      ...user as IUserResponse,
      favoriteAmount: await controller.getFavoriteAmount(user.id),
      commentAmount: await controller.getCommentAmount(user.id),
    }
  };
}
