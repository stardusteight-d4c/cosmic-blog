import { IUserReflectObject } from "@/domain/src/user";
import { UserController } from "../user.controller";

export async function buildGetByIdResponse(request: {
  controller: UserController;
  user: IUserReflectObject;
}) {
  const { controller, user } = request;
  return {
    user: user,
    favoriteAmount: await controller.getFavoriteAmount(user.id),
    commentAmount: await controller.getCommentAmount(user.id),
  };
}
