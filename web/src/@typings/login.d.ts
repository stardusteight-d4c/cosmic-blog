interface ISignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  selectedAvatar: string;
}

type TUserRole = "reader" | "author" | undefined;

interface IRegisterUserData {
  email: string;
  username: string;
  password: string;
  avatar: string;
  userRole: TUserRole;
}
