import { User } from "../User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(updatedUser: User): Promise<User>;
  delete(userId: string): Promise<User>;
  deleteAll(): Promise<void>;
  findById(userId: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
