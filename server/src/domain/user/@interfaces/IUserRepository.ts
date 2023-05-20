import { User } from "../User";

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  deleteUser(userId: string): Promise<User>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  changeEmail(updatedUser: User): Promise<User>;
  changePassword(updatedUser: User): Promise<User>;
  toggleFavorite(updatedUser: User): Promise<User>;
}
