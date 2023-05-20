import { User } from "../User";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  updateUser(updatedUser: User): Promise<User>;
  deleteUser(userId: string): Promise<User>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
}
