interface ISocialLinks {
  [key: string]: string | undefined;
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
}

interface IUser {
  id: string;
  email: string;
  username: string;
  avatar: string;
  userRole: TUserRole;
  socialLinks: ISocialLinks | undefined;
  favoriteAmount?: number;
  commentAmount?: number;
}

interface IUserObject {
  id?: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  userRole?: TUserRole;
  socialLinks?: ISocialLinks | undefined;
}
