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

  console.log(userInstance?.reflect);


  const newInstance = await userService.changePassword({
    userId: userInstance!.reflect.id!,
    confirmationPassword: userInstance.reflect.password,
    newPassword: 'senhaaaa78',
  })

  console.log(newInstance?.reflect);
  
  const newInstance2 = await userService.changePassword({
    userId: userInstance!.reflect.id!,
    confirmationPassword: 'senhaaaa78',
    newPassword: 'senhaaaa79',
  })

  console.log(await userService.findUserByEmail('johndoe@example.com').then(data => data?.reflect));
  
  const newInstance3 = await userService.changeEmail({
    userId: newInstance2!.reflect.id!,
    confirmationPassword: newInstance2!.reflect.password,
    newEmail: 'newemail@email.com',
  })

  console.log(newInstance3?.reflect);
  

}

asyncFunction()

// const userInstance = new UserBuilder()
//   .setEmail('johndoe@example.com')
//   .setUsername('johndoe')
//   .setPassword('pa$$word1')
//   .build()
// userInstance.changePassword({
//   currentPassword: 'pa$$word1',
//   newPassword: 'Novasenh1a',
// })
// userInstance.changePassword({
//   currentPassword: 'Novasenh1a',
//   newPassword: 'asdfgsst88',
// })
// userInstance.changePassword({
//   currentPassword: 'asdfgsst88',
//   newPassword: 'aaaaaaa88',
// })
// userInstance.changeEmail({
//   currentPassword: 'aaaaaaa88',
//   newEmail: 'aa@email.com',
// })

// const myPost: PostObject = {
//   tags: ['nodejs', 'typescript', 'domain_driven_design', 'clean_architecture'],
//   author: userInstance.object,
//   body: 'Artigo/conteúdo do post! Um artigo super bem bolado...',
//   title: 'Um post dahora',
//   coverImage:
//     'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
//   postedIn: new Date(),
// }

// const post = new Post(myPost)

// console.log(post)

// userInstance.toggleFavorite(post.id!)
// console.log('Post.allPosts', Post.allPosts);

// // console.log(userInstance.favoritedPosts)

// console.log(userInstance.object)

// // console.log(post.tags);

// // console.log('post', post)
