import type { IUserRepository } from "@/@typings/user";
import { User } from "@domain/src/user";
import { knex } from "../config";

export class UserPostgreSQLRepository implements IUserRepository {
  private static instance: UserPostgreSQLRepository;

  private constructor() {}

  private deleteUndefinedFields(copyUpdate: any): void {
    const fieldsToDelete = [
      "password",
      "username",
      "email",
      "avatar",
      "userRole",
      "socialLinks",
    ];
    for (const field of fieldsToDelete) {
      if (copyUpdate[field] === undefined) {
        delete copyUpdate[field];
      }
    }
  }

  private async replace(updatedUser: User, existingUser: User): Promise<User> {
    const copyUpdate = updatedUser.reflect;
    this.deleteUndefinedFields(copyUpdate);
    const updatedUserObj = { ...existingUser, ...copyUpdate };
    const newUser = new User({ ...updatedUserObj });
    await knex("users")
      .where("id", updatedUser.reflect.id)
      .update(newUser.reflect);
    return updatedUser;
  }

  public static getInstance(): UserPostgreSQLRepository {
    if (!UserPostgreSQLRepository.instance) {
      UserPostgreSQLRepository.instance = new UserPostgreSQLRepository();
    }
    return UserPostgreSQLRepository.instance;
  }

  public async create(user: User): Promise<User> {
    try {
      const [createdUser] = await knex("users")
        .insert(user.reflect)
        .returning("*");
      return new User(createdUser);
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  public async update(updatedUser: User, existingUser: User): Promise<User> {
    try {
      const user = await this.replace(updatedUser, existingUser);
      return user;
    } catch (error) {
      throw new Error(`Error updating user : ${error}`);
    }
  }

  public async delete(userId: string): Promise<void> {
    try {
      await knex.transaction(async (trx) => {
        await trx("users").where("id", userId).del().returning("*");
      });
    } catch (error) {
      throw new Error(`Error deleting user by id: ${error}`);
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      return knex.transaction(async (trx) => {
        await trx("users").del();
      });
    } catch (error) {
      throw new Error(`Error deleting all users: ${error}`);
    }
  }

  public async findById(userId: string): Promise<User | undefined> {
    try {
      const user = await knex("users").select("*").where("id", userId).first();
      if (user) {
        return new User(user);
      }
      return undefined;
    } catch (error) {
      throw new Error(`Error searching for user by id: ${error}`);
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await knex("users")
        .select("*")
        .where("email", email)
        .first();
      if (user) {
        return new User(user);
      }
      return undefined;
    } catch (error) {
      throw new Error(`Error finding for user by email: ${error}`);
    }
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await knex("users")
        .select("*")
        .where("username", username)
        .first();
      if (user) {
        return new User(user);
      }
      return undefined;
    } catch (error) {
      throw new Error(`Error finding for user by username: ${error}`);
    }
  }

  public async findManyByUsername(
    username: string,
    limit: number
  ): Promise<User[]> {
    try {
      const users = await knex("users")
        .select("*")
        .where("username", username)
        .limit(limit);
      return users.map((user) => new User(user));
    } catch (error) {
      throw new Error(`Error finding for multiple users by username: ${error}`);
    }
  }
}
