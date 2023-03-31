import { randomUUID } from 'node:crypto'
import { Author, AuthorObject } from './Author'

export interface CommentObject {
  id: string
  postedAt: Date
  author: AuthorObject
  body: string
}

export class Comment {
  id: string
  postedAt: Date
  author: Author
  body: string

  constructor(properties: CommentObject) {
    this.id = properties.id || randomUUID()
    this.body = properties.body
    this.postedAt = properties.postedAt
    this.author = new Author(properties.author)
  }

  public get object(): CommentObject {
    return {
      id: this.id,
      body: this.body,
      postedAt: this.postedAt,
      author: this.author.object,
    }
  }

  public canEdit(author: Author): boolean {
    return this.author.id === author.id
  }
}
