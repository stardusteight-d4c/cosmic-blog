import { ISocialLinks, User } from "..";
import { IUserReflectObject } from "./IUserReflectObject";

export interface IUserService {
  createUser(user: IUserReflectObject): Promise<User>;
  deleteUser(userId: string): Promise<User | undefined>;
  getUserById(userId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsersByUsername(username: string): Promise<User[]>;
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
  updateUser(user: IUserReflectObject): Promise<User>;
}
