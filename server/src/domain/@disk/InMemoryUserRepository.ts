import { Favorite } from '../entities/Favorite'
import { User, UserRepository } from '../entities/User'

export class InMemoryUserRepository implements UserRepository {
  #users: Map<string, User> = new Map()

  public get users() {
    throw new Error('Cannot access users property directly.')
  }
  public set users(_value: string) {
    throw new Error('Cannot modify users property directly.')
  }

  public getAllUsers(): User[] {
    return [...this.#users.values()];
  }

  public createUser(user: User): User {
    this.#users.set(user.id, user)
    return user
  }

  public findUserById(id: string): User | undefined {
    return this.#users.get(id)
  }

  public findUserByEmail(email: string): User | undefined {
    return Array.from(this.#users.values()).find((user) => user.email === email)
  }

  public deleteUser(id: string): User {
    const user = this.findUserById(id)!
    this.#users.delete(id)
    return user
  }

  public changeEmail(data: {
    currentPassword: string
    newEmail: string
  }): void {
    const user = Array.from(this.#users.values()).find(
      (user) => user.password === data.currentPassword
    )
    if (user) {
      user.email = data.newEmail
    } else {
      throw new Error('User not found or password is incorrect')
    }
  }

  public changePassword(data: {
    currentPassword: string
    newPassword: string
  }): void {
    const user = Array.from(this.#users.values()).find(
      (user) => user.password === data.currentPassword
    )
    if (user) {
      user.password = data.newPassword
    } else {
      throw new Error('User not found or password is incorrect')
    }
  }

  public toggleFavorite(userId: string, postId: string): void {
    const user = this.#users.get(userId)
    if (user) {
      const index = user.favoritedPosts.findIndex(
        (fav) => fav.postId === postId
      )
      if (index === -1) {
        user.favoritedPosts.push(new Favorite({ postId, userId: user.id }))
      } else {
        user.favoritedPosts.splice(index, 1)
      }
      this.#users.set(user.id, user)
    }
  }
}
