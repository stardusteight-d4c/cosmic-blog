import api from "@/lib/axios";
import { getSessionCookie } from "@/utils/getSessionCookie";

export class DELETE {
  constructor() {}

  static async deletePost(postId: string) {
    const authorization = getSessionCookie();
    await api
      .delete(`/post/${postId}`, {
        headers: {
          Authorization: authorization,
        },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }

  static async deleteComment(request: { commentId: string; ownerId: string }) {
    const authorization = getSessionCookie();
    await api
      .delete(`/comment/${request.commentId}?ownerId=${request.ownerId}`, {
        headers: {
          Authorization: authorization,
        },
      })
      .catch((error) => console.log(error));
  }
}
