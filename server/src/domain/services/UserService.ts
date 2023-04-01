import { User, UserObject, UserRepository } from '../entities/User'
import { UserBuilder } from '../builders/UserBuilder'
import Validators from '../../utils/validators'

export default class UserService {
  #userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository
  }

  public createUser(user: UserObject): User {
    const newUser = new UserBuilder()
      .setEmail(user.email)
      .setUsername(user.username)
      .setPassword(user.password)
      .build()
    this.#userRepository.createUser(newUser)
    return newUser
  }

  public deleteUser(userId: string): User | undefined {
    Validators.checkPrimitiveType({ validating: userId, type: 'string' })
    const userExists = this.#userRepository.findUserById(userId)
    if (userExists) {
      const deletedUser = this.#userRepository.deleteUser(userId)
      return deletedUser
    } else {
      throw new Error(`The user with ID: ${userId} was not found.`)
    }
  }

  public findUserById(userId: string): User | undefined {
    Validators.checkPrimitiveType({ validating: userId, type: 'string' })
    return this.#userRepository.findUserById(userId)
  }

  public findUserByEmail(userEmail: string): User | undefined {
    Validators.checkPrimitiveType({ validating: userEmail, type: 'string' })
    Validators.validateEmail(userEmail)
    return this.#userRepository.findUserByEmail(userEmail)
  }

  public changeEmail(data: {
    userId: string
    currentPassword: string
    newEmail: string
  }): void {

    

    // Validators.compareCurrentPassword({
    //   inputPassword: data.currentPassword,
    //   currentPassword:,
    // })
    Validators.validateEmail(data.newEmail)
    // this.#email = data.newEmail
  }
}
