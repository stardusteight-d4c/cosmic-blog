import { IPostReflectObject } from "@/domain/src/post";

export interface GetByIdResponse {
  post: IPostReflectObject;
  favoriteAmount: number;
  commentAmount: number;
  isAuthor: boolean;
  isGuest: boolean;
  isFavorited: boolean;
}
