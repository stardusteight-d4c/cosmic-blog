interface IGetUserResponse {
  id?: string;
  email: string;
  username: string;
  avatar: string;
  userRole: "reader" | "author";
  socialLinks?:
    | {
        github?: string;
        linkedin?: string;
        instagram?: string;
        twitter?: string;
        facebook?: string;
        email?: string;
      }
    | undefined;
  favoriteAmount?: number;
  commentAmount?: number;
}

interface IRegisterResponse {
  user: IGetUserResponse;
  sessionToken: string;
}
