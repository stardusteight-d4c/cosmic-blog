import { User } from "@domain/src/user";

export interface IUserReflectObject {
  id?: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  userRole?: TUserRole;
  socialLinks?: ISocialLinks | undefined;
}

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(updatedUser: User): Promise<User>;
  delete(userId: string): Promise<User>;
  deleteAll(): Promise<void>;
  findById(userId: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findManyByUsername(username: string): Promise<User[]>;
}

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

export interface ISocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
}

export type TUserRole = "reader" | "author";
