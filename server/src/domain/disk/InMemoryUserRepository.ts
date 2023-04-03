import { Favorite } from "../entities/Favorite";
import { User, IUserRepository } from "../entities/User";

export class InMemoryUserRepository implements IUserRepository {
  #users: Map<string, User> = new Map();

  public get users() {
    throw new Error("Cannot access users property directly.");
  }
  public set users(_value: string) {
    throw new Error("Cannot modify users property directly.");
  }

  private async replaceUser(updatedUser: User): Promise<User> {
    const existingUser = await this.findUserById(updatedUser.reflect.id!);
    if (!existingUser) {
      throw new Error(`No user found with id: ${updatedUser.reflect.id}`);
    }
    this.#users.delete(existingUser.reflect.id!);
    this.#users.set(updatedUser.reflect.id!, updatedUser);
    return updatedUser;
  }

  public async createUser(user: User): Promise<User> {
    this.#users.set(user.reflect.id!, user);
    return user;
  }

  public async deleteUser(userId: string): Promise<User> {
    const user = await this.findUserById(userId);
    this.#users.delete(userId);
    return user!;
  }

  public async findUserById(userId: string): Promise<User | undefined> {
    return this.#users.get(userId);
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.#users.values()).find(
      (user) => user.reflect.email === email,
    );
  }

  public async changeEmail(updatedUser: User): Promise<User> {
    const user = await this.replaceUser(updatedUser);
    return user;
  }

  public async changePassword(updatedUser: User): Promise<User> {
    const user = await this.replaceUser(updatedUser);
    return user;
  }

  public async toggleFavorite(updatedUser: User): Promise<User> {
    const user = await this.replaceUser(updatedUser);
    return user;
  }
}
