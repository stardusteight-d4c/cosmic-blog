import { randomUUID } from 'node:crypto'
import { Author, AuthorObject } from './Author'
import { Comment, CommentObject } from './Comment'
import { Favorite, FavoriteObject } from './Favorite'

export interface PostObject {
  id: string
  title: string
  body: string
  tags: string[]
  coverImage: string
  postedIn: Date
  lastChange?: Date
  author: AuthorObject
  comments: CommentObject[]
  favorites: FavoriteObject[]
}

export class Post {
  id: string
  title: string
  body: string
  tags: string[]
  coverImage: string
  postedIn: Date
  lastChange?: Date
  author: Author
  comments: Comment[]
  favorites: Favorite[]

  constructor(properties: PostObject) {
    this.id = properties.id || randomUUID()
    this.title = properties.title
    this.body = properties.body
    this.tags = properties.tags
    this.coverImage = properties.coverImage
    this.postedIn = properties.postedIn
    this.lastChange = properties.lastChange
    this.author = new Author(properties.author)
    this.comments = properties.comments.map((comment) => new Comment(comment))
    this.favorites = properties.favorites.map(
      (favorite) => new Favorite(favorite)
    )
  }

  public get object(): PostObject {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      tags: this.tags,
      coverImage: this.coverImage,
      postedIn: this.postedIn,
      lastChange: this.lastChange,
      author: this.author.object,
      comments: this.comments.map((comment) => comment.object),
      favorites: this.favorites.map((favorite) => favorite.object),
    }
  }

  public canEdit(author: Author): boolean {
    return this.author.id === author.id
  }
}
