import { IUserReflectObject } from "@/@typings/user";
import { IRegisterResponse, IGetUserResponse } from "..";

export function registerResponse(request: {
  user: IUserReflectObject;
  sessionToken: string;
}): IRegisterResponse {
  const { sessionToken, user } = request;
  delete user.password;
  return {
    user: user as IGetUserResponse,
    sessionToken,
  };
}
