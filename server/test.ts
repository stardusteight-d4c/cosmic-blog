import { Post, PostObject } from './src/domain/entities/Post'
import { UserBuilder } from './src/domain/builders/UserBuilder'

const userInstance = new UserBuilder()
  .setEmail('johndoe@example.com')
  .setUsername('johndoe')
  .setPassword('pa$$word1')
  .build()
userInstance.changePassword({
  currentPassword: 'pa$$word1',
  newPassword: 'Novasenh1a',
})
userInstance.changePassword({
  currentPassword: 'Novasenh1a',
  newPassword: 'asdfgsst88',
})
userInstance.changePassword({
  currentPassword: 'asdfgsst88',
  newPassword: 'aaaaaaa88',
})
userInstance.changeEmail({
  currentPassword: 'aaaaaaa88',
  newEmail: 'aa@email.com',
})

const myPost: PostObject = {
  tags: ['nodejs', 'typescript', 'domain_driven_design', 'clean_architecture'],
  author: userInstance.object,
  body: 'Artigo/conteúdo do post! Um artigo super bem bolado...',
  title: 'Um post dahora',
  coverImage:
    'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
  postedIn: new Date(),
}

const post = new Post(myPost)

console.log(post)

userInstance.toggleFavorite(post.id!)
console.log('Post.allPosts', Post.allPosts);

// console.log(userInstance.favoritedPosts)

console.log(userInstance.object)

// console.log(post.tags);

// console.log('post', post)
