import { IUserReflectObject } from "@/domain/src/user";

export interface RegisterResponse {
  user: IUserReflectObject;
  sessionToken: string;
}

export interface GetByIdResponse {
  user: IUserReflectObject;
  favoriteAmount: number;
  commentAmount: number;
}

