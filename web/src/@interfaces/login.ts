export interface ISignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  selectedAvatar: string;
}

export type TUserRole = "reader" | "author" | undefined;

export interface IRegisterUserData {
  email: string;
  username: string;
  password: string;
  avatar: string;
  userRole: TUserRole;
}
