import Validators from '../../utils/validators'
import { Comment, CommentObject } from './Comment'
import { Favorite, FavoriteObject } from './Favorite'
import { Post, PostObject } from './Post'

export type userRole = 'author-blog' | 'default-user'

export interface UserObject {
  id: string
  email: string
  username: string
  password: string
  type: userRole
  favoritedPosts?: FavoriteObject[]
  commentedPosts?: CommentObject[]
  publishedPosts?: PostObject[]
}

export interface UserRepository {
  createUser(user: User): User
  getUserById(id: string): User | undefined
  getUserByEmail(email: string): User | undefined
  deleteUser(id: string): void
  changeEmail(data: { currentPassword: string; newEmail: string }): void
  changePassword(data: { currentPassword: string; newPassword: string }): void
  toggleFavorite(userId: string, postId: string): void
}

export class User {
  #id: string
  #email: string
  #username: string
  #password: string
  #type: userRole
  #favoritedPosts: Favorite[] = []
  #commentedPosts: Comment[] = []
  #publishedPosts: Post[] = []

  constructor(properties: UserObject) {
    this.#id = properties.id
    this.#email = properties.email
    this.#username = properties.username
    this.#password = properties.password
    this.#type = properties.type
  }

  public get object(): UserObject {
    return {
      id: this.#id,
      email: this.#email,
      username: this.#username,
      password: this.#password,
      type: this.#type,
      favoritedPosts: this.#favoritedPosts.map((post) => post.object),
      commentedPosts: this.#commentedPosts.map((comment) => comment.object),
      publishedPosts: this.#publishedPosts.map((post) => post.object),
    }
  }

  public get id(): string {
    return this.#id
  }
  public set id(_value: string) {
    throw new Error('Cannot modify id property directly.')
  }

  public get email(): string {
    return this.#email
  }
  public set email(_value: string) {
    throw new Error('Cannot modify email property directly.')
  }

  public get username(): string {
    return this.#username
  }
  public set username(_value: string) {
    throw new Error('Cannot modify username property directly.')
  }

  public get password(): string {
    return this.#password
  }
  public set password(_value: string) {
    throw new Error('Cannot modify password property directly.')
  }

  public get type(): string {
    return this.#type
  }
  public set type(_value: string) {
    throw new Error('Cannot modify type property directly.')
  }

  public get favoritedPosts(): FavoriteObject[] {
    return this.#favoritedPosts.map((post) => post.object)
  }
  public set favoritedPosts(_value: FavoriteObject[]) {
    throw new Error('Cannot modify favoritedPosts property directly.')
  }

  public changeEmail(data: {
    currentPassword: string
    newEmail: string
  }): void {
    Validators.compareCurrentPassword({
      inputPassword: data.currentPassword,
      currentPassword: this.#password,
    })
    Validators.validateEmail(data.newEmail)
    this.#email = data.newEmail
  }

  public changePassword(data: {
    currentPassword: string
    newPassword: string
  }): void {
    Validators.compareCurrentPassword({
      inputPassword: data.currentPassword,
      currentPassword: this.#password,
    })
    Validators.validatePassword(data.newPassword)
    this.#password = data.newPassword
  }

  public toggleFavorite(postId: string): void {
    if (typeof postId !== 'string') {
      throw new Error('The parameter must be a String.')
    }
    // mover allPosts para um PostService
    const post = Post.allPosts.find((post) => post.id === postId)
    if (!post) {
      throw new Error(`No post found with id: ${postId}`)
    }
    const index = this.#favoritedPosts.findIndex(
      (favorite) => favorite.postId === postId
    )
    if (index === -1) {
      this.#favoritedPosts.push(new Favorite({ userId: this.#id, postId }))
    } else {
      this.#favoritedPosts.splice(index, 1)
    }
  }
}
