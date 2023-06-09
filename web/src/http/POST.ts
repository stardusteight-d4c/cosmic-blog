import { IRegisterUserData } from "@/@interfaces/login"
import api from "@/lib/axios"
import { setCookie } from "@/utils"

export class POST {
  constructor() { }

  static async verifyEmail(email: string) {
    const encryptedCode = await api
      .post(`/user/verifyEmail/${email}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
    return encryptedCode
  }

  static async registerUser(registerData: IRegisterUserData) {
    const data = await api
      .post(`/user/register`, registerData)
      .then((res) => res.data)
      .catch((error) => console.log(error))
    setCookie(data.sessionToken)
    return data
  }
}