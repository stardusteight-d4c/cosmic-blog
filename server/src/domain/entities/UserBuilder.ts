import { randomUUID } from 'node:crypto'
import Validators from '../../utils/validators'
import { User } from './User'

export class UserBuilder {
  private id: string | undefined
  private email: string | undefined
  private username: string | undefined
  private password: string | undefined

  setId(id: string) {
    this.id = id
    return this
  }

  setEmail(email: string) {
    Validators.validateEmail(email)
    this.email = email
    return this
  }

  setUsername(username: string) {
    Validators.validateUsername(username)
    this.username = username
    return this
  }

  setPassword(password: string) {
    Validators.validatePassword(password)
    this.password = password
    return this
  }

  build() {
    if (!this.email) {
      throw new Error('Email is required.')
    }
    if (!this.username) {
      throw new Error('Username is required.')
    }
    if (!this.password) {
      throw new Error('Password is required.')
    }
    return new User({
      id: this.id || randomUUID(),
      email: this.email,
      username: this.username,
      password: this.password,
    })
  }
}
