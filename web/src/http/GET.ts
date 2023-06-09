import { IPostResponse } from "@/@interfaces/post";
import { IUser } from "@/@interfaces/user";
import api from "@/lib/axios";
import { setCookie } from "@/utils";
import { getSessionCookie } from "@/utils/getSessionCookie";

export class GET {
  constructor() { }

  static async userData(id: string) {
    const user = await api
      .get<{ user: IUser }>(`/user/${id}`)
      .then((res) => res.data.user)
      .catch((error) => console.log(error))
    return user
  }

  static async favoritedPosts(request: { userId: string, skip: number }) {
    const { userId, skip } = request
    const favoritedPosts = await api
      .get<IPostResponse[]>(
        `/post/pagination/byUserFavorites?userId=${userId}&skip=${skip}&pageSize=3`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error))
    return favoritedPosts
  }

  static async commentedPosts(request: { userId: string, skip: number }) {
    const { userId, skip } = request
    const commentedPosts = await api
      .get(
        `/comment/pagination?by=userId&value=${userId}&skip=${skip}&pageSize=3`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error))
    return commentedPosts
  }

  static async sign(request: { identifier: string; password: string }) {
    const { identifier, password } = request
    const data = await api
      .get(`/user/signin?identifier=${identifier}&password=${password}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
    setCookie(data.sessionToken)
    return data
  }

  static async homePosts(skip: number) {
    const posts = await api
      .get<IPostResponse[]>(`/post/pagination?skip=${skip}&pageSize=6`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
    return posts
  }

  static async post(postId: string) {
    const authorization = getSessionCookie()
    const post = await api.get<IPostResponse>(`/post/${postId}`, {
      headers: {
        Authorization: authorization,
      },
    }).then((res) => res.data)
      .catch((error) => console.log(error))
    return post
  }

  static async searchByTitle(title: string) {
    const results = await api.get<IPostResponse[]>(`/post/title?equals=${title}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
    return results
  }

  static async comments(request: { postId: string, skip: number }) {
    const { postId, skip } = request
    const comments = await api
      .get(
        `/comment/pagination?by=postId&value=${postId}&skip=${skip}&pageSize=4`
      )
      .then((res) => res.data)
      .catch((error) => console.log(error))
    return comments
  }
}