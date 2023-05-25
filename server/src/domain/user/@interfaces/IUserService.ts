import { FavoritePostEvent, Post } from "@/domain/post";
import { ISocialLinks, User } from "..";
import { IUserReflectObject } from "./IUserReflectObject";
import {
  Comment,
  CreateCommentEvent,
  DeleteCommentEvent,
} from "@/domain/comment";
import { ToggleFavoritePostEvent } from "@/domain/@value-objects/favorite/ToggleFavoritePostEvent";

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
  changeSocialLinks(request: {
    userId: string;
    socialLinks: ISocialLinks;
  }): Promise<User | undefined>; 
  // Event Handlers
  handlerToggleFavoritePostEvent(
    event: ToggleFavoritePostEvent,
  ): Promise<Post | undefined>;
  handlerCreateCommentEvent(
    event: CreateCommentEvent,
  ): Promise<Comment | undefined>;
  handlerDeleteCommentEvent(event: DeleteCommentEvent): Promise<void>;
}
