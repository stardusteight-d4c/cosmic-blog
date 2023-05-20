import { Post } from "@/domain/post";
import { User } from "..";
import { IUserReflectObject } from "./IUserReflectObject";
import { Comment } from "@/domain/comment";
import {
  CommentPostEvent,
  CreatePostEvent,
  FavoritePostEvent,
} from "@/domain/post/PostEvents";

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
  handlerCreatePostEvent(event: CreatePostEvent): Promise<User | undefined>;
  handlerFavoritePostEvent(event: FavoritePostEvent): Promise<User | undefined>;
  handlerCommentPostEvent(
    event: CommentPostEvent,
  ): Promise<Comment | undefined>;
}
