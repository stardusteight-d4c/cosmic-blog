import { User } from "..";
import { IUserReflectObject } from "./IUserReflectObject";
import { Comment } from "@/domain/comment";
import { CommentPostEvent, FavoritePostEvent } from "@/domain/post/PostEvents";

export interface IUserService {
  createUser(user: IUserReflectObject): Promise<User>;
  deleteUser(userId: string): Promise<User | undefined>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  changeEmail(data: {
    userId: string;
    confirmationPassword: string;
    newEmail: string;
  }): Promise<User | undefined>;
  changePassword(data: {
    userId: string;
    confirmationPassword: string;
    newPassword: string;
  }): Promise<User | undefined>;
  // Event Handlers 
  handlerFavoritePostEvent(
    event: FavoritePostEvent,
  ): Promise<User | undefined>;
  handlerCommentPostEvent(
    commentPostEvent: CommentPostEvent,
  ): Promise<Comment | undefined>;
}
