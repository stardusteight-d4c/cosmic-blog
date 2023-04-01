import { randomUUID } from 'node:crypto'
import { Comment, CommentObject } from './Comment'
import { Favorite, FavoriteObject } from './Favorite'
import { User, UserObject } from './User'

export interface PostObject {
  id?: string
  title: string
  body: string
  tags: string[]
  coverImage: string
  postedIn: Date
  lastChange?: Date
  author: UserObject
  comments?: CommentObject[]
  favorites?: FavoriteObject[]
}

export class Post {
  static allPosts: Post[] = []

  id: string
  title: string
  body: string
  private _tags: string[]
  coverImage: string
  postedIn: Date
  lastChange?: Date
  author: User
  comments: Comment[] = []
  favorites: Favorite[] = []

  constructor(properties: PostObject) {
    this.id = properties.id || randomUUID()
    this.title = properties.title
    this.body = properties.body
    this._tags = properties.tags
    this.coverImage = properties.coverImage
    this.postedIn = properties.postedIn
    this.lastChange = properties.lastChange
    this.author = new User(properties.author)
    this.comments = properties.comments
      ? properties.comments.map((comment) => new Comment(comment))
      : []
    this.favorites = properties.favorites
      ? properties.favorites.map((favorite) => new Favorite(favorite))
      : []

    Post.allPosts.push(this)
  }

  public get object(): PostObject {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      tags: this._tags,
      coverImage: this.coverImage,
      postedIn: this.postedIn,
      lastChange: this.lastChange,
      author: this.author.object,
      comments: this.comments.map((comment) => comment.object),
      favorites: this.favorites.map((favorite) => favorite.object),
    }
  }

  get tags(): string[] {
    return this._tags
  }

  set tags(value: string[]) {
    if (value.length > 4) {
      throw new Error('The maximum number of tags allowed is 4.')
    }
    this._tags = value
  }

  // public canEdit(author: User): boolean {
  //   return this.author.id === author.id
  // }
}
