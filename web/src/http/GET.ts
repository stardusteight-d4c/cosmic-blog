import { IPostResponse } from "@/@interfaces/post";
import { IUser } from "@/@interfaces/user";
import api from "@/lib/axios";
import { setCookie } from "@/utils";

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
}