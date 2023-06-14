import { TUserRole } from "./login";

export interface ICommentResponse {
  id: string;
  post: {
    id: string;
    title: string;
    slug: string;
  };
  owner: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    userRole: TUserRole;
  };
  content: string;
  postedAt: Date;
}

export interface IComment {
  id?: string;
  post: {
    id: string;
    title: string;
    slug: string;
  };
  owner: {
    id: string;
    username: string;
    avatar: string;
  };
  content: string;
  postedAt: Date;
}
