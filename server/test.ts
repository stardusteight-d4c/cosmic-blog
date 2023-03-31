import { Post, PostObject } from './src/domain/entities/Post'
import { User, UserObject } from './src/domain/entities/User'

const myAuthor: UserObject = {
  email: 'emai@email.com',
  username: 'Stardusteight',
  password: 'asdfgt88',
}

// const myPost: PostObject = {
//   tags: ['nodejs', 'typescript', 'domain_driven_design', 'clean_architecture'],
//   author: new User(myAuthor),
//   body: 'Artigo/conteúdo do post! Um artigo super bem bolado...',
//   title: 'Um post dahora',
//   coverImage:
//     'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
//   postedIn: new Date(),
// }

const authorInstance = new User(myAuthor)
authorInstance.changePassword({
  currentPassword: 'asdfgt88',
  newPassword: 'Novasenh1a',
})
authorInstance.changePassword({currentPassword: 'Novasenh1a', newPassword: 'asdfgsst88'})
authorInstance.changePassword({currentPassword: 'asdfgsst88', newPassword: 'aaaaaaa88'})
authorInstance.changeEmail({currentPassword: 'aaaaaaa88', newEmail: 'aa@email.com'})
console.log(authorInstance.object)

// const post = new Post(myPost)
// console.log(post.tags);

// console.log('post', post)
