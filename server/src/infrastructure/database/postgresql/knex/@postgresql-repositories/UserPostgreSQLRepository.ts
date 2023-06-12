import type { IUserRepository } from "@typings/user";
import { User } from "@domain/src/user";
import { knex } from "../config";

export class UserPostgreSQLRepository implements IUserRepository {
  private static instance: UserPostgreSQLRepository;

  private constructor() { }

  private async replace(updatedUser: User): Promise<User> {
    const copyUpdate = updatedUser.reflect
    const existingUser = await knex('users')
      .select('*')
      .where('id', updatedUser.reflect.id)
      .first();
    if (!existingUser) {
      throw new Error(`No user found with id: ${updatedUser.reflect.id}`);
    }
    if (copyUpdate.password === undefined) {
      delete copyUpdate.password
    }
    const updatedUserObj = { ...existingUser, ...copyUpdate };
    const newUser = new User({ ...updatedUserObj })
    await knex('users')
      .where('id', updatedUser.id)
      .update(newUser.reflect);
    return updatedUser
  }

  public static getInstance(): UserPostgreSQLRepository {
    if (!UserPostgreSQLRepository.instance) {
      UserPostgreSQLRepository.instance = new UserPostgreSQLRepository();
    }
    return UserPostgreSQLRepository.instance;
  }

  public async create(user: User): Promise<User> {
    try {
      const [createdUser] = await knex('users').insert(user.reflect).returning('*');
      return new User(createdUser);
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  public async update(updatedUser: User): Promise<User> {
    try {
      const user = await this.replace(updatedUser);
      return user;
    } catch (error) {
      throw new Error(`Error updating user : ${error}`);
    }
  }

  public async delete(userId: string): Promise<User> {
    try {
      return await knex.transaction(async (trx) => {
        const deletedUser = await trx('users')
          .where('id', userId)
          .del()
          .returning('*')
          .then((result) => result[0]);
        if (!deletedUser) {
          throw new Error(`No user found with id: ${userId}`);
        }
        return new User(deletedUser);
      });
    } catch (error) {
      throw new Error(`Error deleting user by id: ${error}`);
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      return knex.transaction(async (trx) => {
        await trx('users').del();
      });
    } catch (error) {
      throw new Error(`Error deleting all users: ${error}`);
    }
  }

  public async findById(userId: string): Promise<User | undefined> {
    try {
      const user = await knex('users')
        .select('*')
        .where('id', userId)
        .first();
      if (user) {
        return new User(user)
      }
      return undefined
    } catch (error) {
      throw new Error(`Error searching for user by id: ${error}`);
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await knex('users')
        .select('*')
        .where('email', email)
        .first();
      if (user) {
        return new User(user)
      }
      return undefined
    } catch (error) {
      throw new Error(`Error finding for user by email: ${error}`);
    }
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await knex('users')
        .select('*')
        .where('email', username)
        .first();
      if (user) {
        return new User(user)
      }
      return undefined
    } catch (error) {
      throw new Error(`Error finding for user by username: ${error}`);
    }
  }

  public async findManyByUsername(username: string): Promise<User[]> {
    try {
      const users = await knex('users')
        .select('*')
        .where('username', username);
      return users.map((user) => new User(user))
    } catch (error) {
      throw new Error(`Error finding for multiple users by username: ${error}`);
    }
  }
}
