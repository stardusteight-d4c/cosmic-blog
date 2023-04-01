import { Favorite } from '../entities/Favorite'
import { User, UserRepository } from '../entities/User'

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map()

  createUser(user: User): User {
    this.users.set(user.id, user)
    return user
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id)
  }

  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find((user) => user.email === email)
  }

  deleteUser(id: string): void {
    this.users.delete(id)
  }

  changeEmail(data: { currentPassword: string; newEmail: string }): void {
    const user = Array.from(this.users.values()).find(
      (user) => user.password === data.currentPassword
    )
    if (user) {
      user.email = data.newEmail
    } else {
      throw new Error('User not found or password is incorrect')
    }
  }

  changePassword(data: { currentPassword: string; newPassword: string }): void {
    const user = Array.from(this.users.values()).find(
      (user) => user.password === data.currentPassword
    )
    if (user) {
      user.password = data.newPassword
    } else {
      throw new Error('User not found or password is incorrect')
    }
  }

  toggleFavorite(userId: string, postId: string): void {
    const user = this.users.get(userId)
    if (user) {
      const index = user.favoritedPosts.findIndex(
        (fav) => fav.postId === postId
      )
      if (index === -1) {
        user.favoritedPosts.push(new Favorite({ postId, userId: user.id }))
      } else {
        user.favoritedPosts.splice(index, 1)
      }
      this.users.set(user.id, user)
    }
  }
}
