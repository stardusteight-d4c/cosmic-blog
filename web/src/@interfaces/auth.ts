import { TUserRole } from "./login"

export type decodedToken = {
  user_id: string
  username: string
  avatarId: string
  email: string
  type: TUserRole
}

export interface ISession {
  activeSession: boolean
  token: string | undefined
  decodedToken: decodedToken | undefined
}