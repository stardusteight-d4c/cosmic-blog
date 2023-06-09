import { IUser } from "@/@interfaces/user"
import api from "@/lib/axios"
import { getSessionCookie } from "@/utils/getSessionCookie"

export class PUT {
  constructor() {}

  static async updateUser(updatedUser: IUser) {
    const authorization = getSessionCookie()
    await api
    .put(`/user/update`, updatedUser, {
      headers: {
        Authorization: authorization,
      },
    })
    .catch((error) => console.log(error))
  }
}