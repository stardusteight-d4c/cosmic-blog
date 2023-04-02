import { Favorite } from "../entities/Favorite";
import { User, UserReflectObject, UserRepository } from "../entities/User";

export class InMemoryUserRepository implements UserRepository {
  #users: Map<string, User> = new Map();

  public get users() {
    throw new Error("Cannot access users property directly.");
  }
  public set users(_value: string) {
    throw new Error("Cannot modify users property directly.");
  }

  private async replaceUser(updatedUser: User): Promise<User> {
    const existingUser = await this.findUserById(updatedUser.reflect.id!) 
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

  public async findUserById(userId: string): Promise<User | undefined> {
    return this.#users.get(userId);
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.#users.values()).find(
      (user) => user.reflect.email === email,
    );
  }

  public async deleteUser(userId: string): Promise<User> {
    const user = await this.findUserById(userId);
    this.#users.delete(userId);
    return user!;
  }

  public async changeEmail(updatedUser: User): Promise<User> {
    const user = await this.replaceUser(updatedUser);

    return user;
  }

  public async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    const user = Array.from(this.#users.values()).find(
      (user) => user.password === data.currentPassword,
    );
    if (user) {
      user.password = data.newPassword;
    } else {
      throw new Error("User not found or password is incorrect");
    }
  }

  public async toggleFavorite(userId: string, postId: string): Promise<void> {
    const user = this.#users.get(userId);
    if (user) {
      const index = user.favoritedPosts.findIndex(
        (fav) => fav.postId === postId,
      );
      if (index === -1) {
        user.favoritedPosts.push(new Favorite({ postId, userId: user.id }));
      } else {
        user.favoritedPosts.splice(index, 1);
      }
      this.#users.set(user.id, user);
    }
  }
}
