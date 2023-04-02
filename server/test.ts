import { Post, PostReflectObject } from './src/domain/entities/Post'
import { UserBuilder } from './src/domain/builders/UserBuilder'
import UserService from './src/domain/services/UserService'
import { InMemoryUserRepository } from './src/domain/disk/InMemoryUserRepository'
import { User, IUserReflectObject } from './src/domain/entities/User'
import { PostBuilder } from './src/domain/builders/PostBuilder'

const inMemoryUserRepository = new InMemoryUserRepository()
const userService = new UserService(inMemoryUserRepository)
const myUser: IUserReflectObject = {
  username: 'johndoe8',
  email: 'johndoe@example.com',
  password: 'pa$$word1',
}

const asyncFunction = async () => {
  const userInstance = await userService.createUser(myUser)

  const postInstance = new PostBuilder()
    .setTitle('Título do post!')
    .setBody(
      'Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi'
    )
    .setTags(['nodejs', 'typescript', 'ddd'])
    .setCoverImage(
      'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a'
    )
    .setPostedIn(new Date())
    .setAuthor(userInstance)
    .build()

    console.log(postInstance.reflect);
    

  // console.log(
  //   await userService
  //     .findUserById(userInstance.reflect.id!)
  //     .then((data) => data?.reflect)
  // )

  const retornaNovaIstancia = await userService.changeEmail({
    confirmationPassword: userInstance.reflect.password,
    newEmail: 'newEmail@email.com',
    userId: userInstance.reflect.id!,
  })

  const user = await userService
    .findUserByEmail(retornaNovaIstancia!.reflect.email!)
    .then((data) => data?.reflect)

  await userService.deleteUser(retornaNovaIstancia!.reflect.id!)

  // console.log(user)
}

asyncFunction()
