import api from "@/lib/axios"
import { getSessionCookie } from "@/utils/getSessionCookie"

export class DELETE {
  constructor() { }

  static async deletePost(postId: string) {
    const authorization = getSessionCookie()
    await api
      .delete(`/post/${postId}`, {
        headers: {
          Authorization: authorization,
        },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error))
  }
}