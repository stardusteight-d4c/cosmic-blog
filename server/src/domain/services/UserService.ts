import { User, UserObject, UserRepository } from '../entities/User'
import { UserBuilder } from '../builders/UserBuilder'

export default class UserService {
  #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
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


}
