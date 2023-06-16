import type { IUserReflectObject, IUserRepository } from "@typings/user";
import { User } from "@domain/src/user";

export class UserInMemoryRepository implements IUserRepository {
  private static instance: UserInMemoryRepository;
  #users: Map<string, User> = new Map();

  private constructor() {}

  private deleteUndefinedFields(copyUpdate: IUserReflectObject): void {
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

  private normalizeUsername(username: string): string {
    return username.toLowerCase();
  }

  private filterUsersByUsername(username: string, limit: number): User[] {
    const normalizedUsername = this.normalizeUsername(username);
    const usersArray = Array.from(this.#users.values());
    const filteredUsers = usersArray.filter((user) => {
      const normalizedUser = this.normalizeUsername(user.reflect.username);
      return normalizedUser.includes(normalizedUsername);
    });
    const limitedUsers = filteredUsers.slice(0, limit);
    return limitedUsers;
  }

  private async replace(updatedUser: User, existingUser: User): Promise<User> {
    const copyUpdate = updatedUser.reflect;
    this.deleteUndefinedFields(copyUpdate);
    const updatedUserObj = { ...existingUser.reflect, ...copyUpdate };
    const newUser = new User({ ...updatedUserObj });
    this.#users.delete(existingUser.reflect.id);
    this.#users.set(newUser.reflect.id, newUser);
    return newUser;
  }

  public static getInstance(): UserInMemoryRepository {
    if (!UserInMemoryRepository.instance) {
      UserInMemoryRepository.instance = new UserInMemoryRepository();
    }
    return UserInMemoryRepository.instance;
  }

  public async create(user: User): Promise<User> {
    this.#users.set(user.reflect.id!, user);
    return user;
  }

  public async update(updatedUser: User, existingUser: User): Promise<User> {
    return await this.replace(updatedUser, existingUser);
  }

  public async delete(id: string): Promise<void> {
    this.#users.delete(id);
  }

  public async deleteAll(): Promise<void> {
    this.#users.clear();
  }

  public async findById(userId: string): Promise<User | undefined> {
    return this.#users.get(userId);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.#users.values()).find(
      (user) => user.reflect.email === email
    );
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.#users.values()).find(
      (user) => user.reflect.username === username
    );
  }

  public async findManyByUsername(
    username: string,
    limit: number
  ): Promise<User[]> {
    return this.filterUsersByUsername(username, limit);
  }

  public get users() {
    throw new Error("Cannot access users property directly.");
  }
  public set users(_value: string) {
    throw new Error("Cannot modify users property directly.");
  }
}
