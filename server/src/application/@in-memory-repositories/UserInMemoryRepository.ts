import type { IUserRepository } from "@/@typings/user";
import { err } from "@domain/src/user/helpers/errors";
import { User } from "@domain/src/user";

export class UserInMemoryRepository implements IUserRepository {
  private static instance: UserInMemoryRepository;
  #users: Map<string, User> = new Map();

  private constructor() {}

  private async replace(updatedUser: User): Promise<User> {
    const copyUpdate = updatedUser.reflect;
    const existingUser = await this.findById(updatedUser.reflect.id!);
    if (!existingUser) {
      throw new Error(err.userNotFoundWithId(updatedUser.reflect.id));
    }
    if (copyUpdate.password === undefined) {
      delete copyUpdate.password;
    }
    if (copyUpdate.username === undefined) {
      delete copyUpdate.username;
    }
    if (copyUpdate.email === undefined) {
      delete copyUpdate.email;
    }
    if (copyUpdate.avatar === undefined) {
      delete copyUpdate.avatar;
    }
    if (copyUpdate.userRole === undefined) {
      delete copyUpdate.userRole;
    }
    if (copyUpdate.socialLinks === undefined) {
      delete copyUpdate.socialLinks;
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
    const emailAlreadyExists = await this.findByEmail(user.reflect.email);
    if (emailAlreadyExists) {
      throw new Error(err.emailAlreadyExists);
    }
    const usernameAlreadyExists = await this.findByUsername(user.reflect.username);
    if (usernameAlreadyExists) {
      throw new Error(err.usernameAlreadyExists);
    }
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
