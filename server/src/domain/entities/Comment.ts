import { randomUUID } from 'node:crypto'
import { User, UserObject } from './User'

export interface CommentObject {
  id: string
  postedAt: Date
  author: UserObject
  body: string
}

export class Comment {
  id: string
  postedAt: Date
  author: User
  body: string

  constructor(properties: CommentObject) {
    this.id = properties.id || randomUUID()
    this.body = properties.body
    this.postedAt = properties.postedAt
    this.author = new User(properties.author)
  }

  public get object(): CommentObject {
    return {
      id: this.id,
      body: this.body,
      postedAt: this.postedAt,
      author: this.author.object,
    }
  }

  // public canEdit(author: User): boolean {
  //   return this.author.id === author.id
  // }
}
