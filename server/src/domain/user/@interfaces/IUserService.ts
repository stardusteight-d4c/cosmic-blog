import { User } from "..";
import { FavoritePostCommand } from "@/domain/post";
import { IUserReflectObject } from "./IUserReflectObject";
import { CommentPostCommand } from "@/domain/post/PostCommands";
import { Comment } from "@/domain/comment";

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
  // Event Handlers (capture of commands)
  handlerFavoritePost(
    command: FavoritePostCommand,
  ): Promise<User | undefined>;
  handlerCommentPost(
    commentPostCommand: CommentPostCommand,
  ): Promise<Comment | undefined>;
}
