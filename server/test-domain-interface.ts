import { IPostReflectObject } from './src/domain/entities/Post'
import UserService from './src/domain/services/UserService'
import { InMemoryUserRepository } from './src/domain/disk/InMemoryUserRepository'
import { IUserReflectObject } from './src/domain/entities/User'
import { InMemoryPostRepository } from './src/domain/disk/InMemoryPostRepository'
import PostService from './src/domain/services/PostService'
import { UserPublisher } from './src/domain/bus/publishers/UserPublisher'
import UserObserver from './src/domain/bus/observers/UserObserver'

const inMemoryUserRepository = new InMemoryUserRepository()
const inMemoryPostRepository = new InMemoryPostRepository()
const userPublisher = new UserPublisher()

const userService = new UserService({
  userPublisher: userPublisher,
  userRepository: inMemoryUserRepository,
  postRepository: inMemoryPostRepository,
})

userPublisher.register(new UserObserver(userService))

const postService = new PostService(inMemoryPostRepository)
const myUser: IUserReflectObject = {
  username: 'johndoe8',
  email: 'johndoe@example.com',
  password: 'pa$$word1',
}

const asyncFunction = async () => {
  const userInstance = await userService.createUser(myUser)

  const postObject: IPostReflectObject = {
    title: 'Título doaaa post!',
    body: 'Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi',
    tags: ['nodejs', 'typescript', 'ddd'],
    coverImage:
      'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a',
    postedIn: new Date(),
    author: userInstance.reflect,
  }

  const postInstance = await postService.createPost(postObject)

   const response = await userService.publishFavoritePostCommand(
    userInstance.reflect.id!,
    postInstance.reflect.id!
  )

  console.log(response?.reflect);
  



  // console.log(
  //   await userService.findUserById(userInstance.reflect.id!).then((data) => data?.reflect.favoritedPosts)
  // )
}

asyncFunction()
