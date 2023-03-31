import { randomUUID } from 'node:crypto'

export interface UserObject {
  id: string
  email: string
  username: string
  password: string
}

export class User {
  id: string
  email: string
  username: string
  password: string

  constructor(properties: UserObject) {
    this.id = properties.id || randomUUID()
    this.email = properties.email
    this.username = properties.username
    this.password = properties.password
  }

  public get object(): UserObject {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      password: this.password,
    }
  }
}
