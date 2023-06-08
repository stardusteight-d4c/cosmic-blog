export interface IArticleData {
  postId?: string
  tags: Array<string>
  coverImage: string
  title: string
  date: Date
  body: string
}

export interface IHeadArticleData {
  tags: Array<string>
  coverImage: string
  title: string
  date: Date
}
