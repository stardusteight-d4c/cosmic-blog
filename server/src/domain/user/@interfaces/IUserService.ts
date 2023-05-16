import { FavoritePostCommand } from "@/domain/post";
import { User } from "../User";
import { IUserReflectObject } from "./IUserReflectObject";

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
  // CommandHandlers
  handlerFavoritePostCommand(
    command: FavoritePostCommand,
  ): Promise<User | undefined>;
}