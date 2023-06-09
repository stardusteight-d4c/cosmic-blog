import { IUserReflectObject } from "@/domain/src/user";
import { IRegisterResponse, IUserResponse } from "..";

export function registerResponse(request: {
  user: IUserReflectObject;
  sessionToken: string
}): IRegisterResponse {
  const { sessionToken, user } = request;
  delete user.password;
  return {
    user: user as IUserResponse,
    sessionToken
  }
};
