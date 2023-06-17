import type { IUserRepository } from "@typings/user";
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
      .update(newUser.reflect)
      .catch((err) => console.error(err));
    return updatedUser;
  }

  public static getInstance(): UserPostgreSQLRepository {
    if (!UserPostgreSQLRepository.instance) {
      UserPostgreSQLRepository.instance = new UserPostgreSQLRepository();
    }
    return UserPostgreSQLRepository.instance;
  }

  public async create(user: User): Promise<User> {
    return knex("users")
      .insert(user.reflect)
      .returning("*")
      .then(([createdUser]) => new User(createdUser))
      .catch((err) => {
        throw new Error(`error creating user: ${err}`);
      });
  }

  public async update(updatedUser: User, existingUser: User): Promise<User> {
    return this.replace(updatedUser, existingUser)
      .then((user) => user)
      .catch((err) => {
        throw new Error(`error updating user: ${err}`);
      });
  }

  public async delete(userId: string): Promise<void> {
    return knex
      .transaction(async (trx) => {
        await trx("users").where("id", userId).del().returning("*");
      })
      .catch((err) => {
        throw new Error(`error deleting user: ${err}`);
      });
  }

  public async deleteAll(): Promise<void> {
    return knex
      .transaction(async (trx) => {
        await trx("users").del();
      })
      .catch((err) => {
        throw new Error(`error deleting all users: ${err}`);
      });
  }

  public async findById(userId: string): Promise<User | undefined> {
    return knex("users")
      .select("*")
      .where("id", userId)
      .first()
      .then((user) => (user ? new User(user) : undefined))
      .catch((err) => {
        throw new Error(`error searching for user by id: ${err}`);
      });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return knex("users")
      .select("*")
      .where("email", email)
      .first()
      .then((user) => (user ? new User(user) : undefined))
      .catch((err) => {
        throw new Error(`error finding for user by email: ${err}`);
      });
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return knex("users")
      .select("*")
      .where("username", username)
      .first()
      .then((user) => (user ? new User(user) : undefined))
      .catch((err) => {
        throw new Error(`error finding for user by username: ${err}`);
      });
  }

  public async findManyByUsername(
    username: string,
    limit: number
  ): Promise<User[]> {
    return knex("users")
      .select("*")
      .where("username", username)
      .limit(limit)
      .then((users) => users.map((user) => new User(user)))
      .catch((err) => {
        throw new Error(`error finding for multiple users by username: ${err}`);
      });
  }
}
