import { randomUUID } from 'node:crypto'

export interface AuthorObject {
  id: string
  username: string
  email: string
}

export class Author {
  id: string
  username: string
  email: string

  constructor(properties: AuthorObject) {
    this.id = properties.id || randomUUID()
    this.email = properties.email
    this.username = properties.username
  }

  public get object(): AuthorObject {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
    }
  }
}
