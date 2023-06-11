import { IUserRepository, User } from "@/domain/src/user";
import { knex } from "../config";

export class UserPostgreSQLRepository implements IUserRepository {

  async create(user: User): Promise<User> {
    try {
      const [createdUser] = await knex('users').insert(user.reflect).returning('*');
      return new User(createdUser);
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error}`);
    }
  }

  update(updatedUser: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(userId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  deleteAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(userId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findByUsername(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findManyByUsername(username: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}