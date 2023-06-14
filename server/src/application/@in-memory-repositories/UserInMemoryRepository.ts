import type { IUserRepository } from "@/@typings/user";
import { User } from "@domain/src/user";

export class UserInMemoryRepository implements IUserRepository {
  private static instance: UserInMemoryRepository;
  #users: Map<string, User> = new Map();

  private constructor() {}

  private async replace(updatedUser: User): Promise<User> {
    const copyUpdate = updatedUser.reflect;
    const existingUser = await this.findById(updatedUser.reflect.id!);
    if (!existingUser) {
      throw new Error(`No user found with id: ${updatedUser.reflect.id}`);
    }
    if (copyUpdate.password === undefined) {
      delete copyUpdate.password;
    }
    const updatedUserObj = { ...existingUser.reflect, ...copyUpdate };
    const newUser = new User({ ...updatedUserObj });
    this.#users.delete(existingUser.reflect.id!);
    this.#users.set(newUser.reflect.id!, newUser);
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

  public async delete(userId: string): Promise<User> {
    const user = await this.findById(userId);
    this.#users.delete(userId);
    return user!;
  }

  public async deleteAll(): Promise<void> {
    this.#users.clear();
  }

  public async findById(userId: string): Promise<User | undefined> {
    const user = this.#users.get(userId);
    if (!user) {
      throw new Error(`No user found with id: ${userId}`);
    }
    return user;
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

  public async findManyByUsername(username: string): Promise<User[]> {
    const normalizedUsername = username.toLowerCase();
    const usersArray = Array.from(this.#users.values());
    const filteredUsers = usersArray.filter((user) => {
      const normalizedUser = user.reflect.username.toLowerCase();
      return normalizedUser.includes(normalizedUsername);
    });
    const limitedUsers = filteredUsers.slice(0, 6);
    return limitedUsers;
  }

  public async update(updatedUser: User): Promise<User> {
    const user = await this.replace(updatedUser);
    return user;
  }

  public get users() {
    throw new Error("Cannot access users property directly.");
  }
  public set users(_value: string) {
    throw new Error("Cannot modify users property directly.");
  }
}
