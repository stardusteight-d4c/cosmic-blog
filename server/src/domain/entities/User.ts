import { randomUUID } from 'node:crypto'
import { validatePassword } from '../../utils'

export interface UserObject {
  id?: string
  email: string
  username: string
  password: string
}

export class User {
  #id: string
  #email: string
  #username: string
  #password: string

  constructor(properties: UserObject) {
    this.#id = properties.id || randomUUID()
    this.#email = properties.email
    this.#username = properties.username
    this.#password = properties.password
  }

  public get object(): UserObject {
    return {
      id: this.#id,
      email: this.#email,
      username: this.#username,
      password: this.#password,
    }
  }

  public get email(): string {
    return this.#email
  }
  public set email(value: string) {
    throw new Error('Cannot modify email property directly.')
  }

  public get password(): string {
    return this.#password
  }
  public set password(_value: string) {
    throw new Error('Cannot modify password property directly.')
  }
  
  public changeEmail(data: {
    currentPassword: string
    newEmail: string
  }): void {
    if (data.currentPassword !== this.#password) {
      throw new Error('Incorrect current password.')
    }
    this.#email = data.newEmail
  }

  public changePassword(data: {
    currentPassword: string
    newPassword: string
  }): void {
    if (data.currentPassword !== this.#password) {
      throw new Error('Incorrect current password.')
    }
    validatePassword(data.newPassword)
    this.#password = data.newPassword
  }
}
