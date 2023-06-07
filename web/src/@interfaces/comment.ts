import { TUserRole } from './login'

export interface ICommentResponse {
  id: string
  postId: string
  postTitle: string
  owner: {
    id: string
    email: string
    username: string
    avatar: string
    userRole: TUserRole
  }
  content: string
  postedAt: Date
}

export interface IComment {
  postId: string
  postTitle: string
  owner: {
    id: string
    username: string
    avatar: string
  }
  content: string
  postedAt: Date
}
