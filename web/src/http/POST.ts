import api from "@/lib/axios";
import { setCookie, getSessionCookie } from "@/utils";

export class POST {
  constructor() {}

  static async verifyEmail(email: string) {
    const encryptedCode = await api
      .post(`/user/verifyEmail/${email}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    return encryptedCode;
  }

  static async registerUser(registerData: IRegisterUserData) {
    const data = await api
      .post(`/user/register`, registerData)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    setCookie(data.sessionToken);
    return data;
  }

  static async publishPost(post: IPublishPostRequest) {
    const authorization = getSessionCookie();
    await api
      .post("/post", post, {
        headers: {
          Authorization: authorization,
        },
      })
      .then((res) => res.data)
      .catch((error) => console.log(error));
  }

  static async leaveComment(comment: IComment) {
    const authorization = getSessionCookie();
    await api
      .post("/comment", comment, {
        headers: {
          Authorization: authorization,
        },
      })
      .catch((error) => console.log(error));
  }
}
