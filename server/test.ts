import { Post, PostObject } from './src/domain/entities/Post'
import { UserBuilder } from './src/domain/builders/UserBuilder'
import UserService from './src/domain/services/UserService'
import { InMemoryUserRepository } from './src/domain/@disk/InMemoryUserRepository'
import { User, UserReflectObject } from './src/domain/entities/User'

const inMemoryUserRepository = new InMemoryUserRepository()
const userService = new UserService(inMemoryUserRepository)
const myUser: UserReflectObject = {
  username: 'johndoe8',
  email: 'johndoe@example.com',
  password: 'pa$$word1',
}

const asyncFunction = async () => {
  const userInstance = await userService.createUser(myUser)

  // console.log(
  //   await userService
  //     .findUserById(userInstance.reflect.id!)
  //     .then((data) => data?.reflect)
  // )

  await userService.changeEmail({
    confirmationPassword: userInstance.reflect.password,
    newEmail: 'newEmail@email.com',
    userId: userInstance.reflect.id!,
  })

  await userService.deleteUser(userInstance!.reflect.id!)

  const user = await userService
    .findUserByEmail(userInstance.reflect.email!)
    .then((data) => data?.reflect)

  console.log(user)
}

asyncFunction()
