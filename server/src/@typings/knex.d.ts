import { Knex } from 'knex';
import { ISocialLinks, IUserReflectObject, TUserRole } from './user';

declare module 'knex/types/tables' {
  interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    avatar: string;
    socialLinks: ISocialLinks;
    userRole: TUserRole;
    created_at: string;
    updated_at: string;
  }

  interface Post {
    id?: string;
    title: string;
    body: string;
    tags: string[];
    coverImage: string;
    postedIn: Date;
    lastChange?: Date;
    author: IUserReflectObject;
    created_at: string;
    updated_at: string;
  }

  interface Comment {
    id: string;
    postId: string;
    postTitle: string;
    owner: IUserReflectObject;
    content: string;
    postedAt: Date;
    created_at: string;
    updated_at: string;
  }

  interface Favorite {
    userId: string;
    postId: string;
    created_at: string;
    updated_at: string;
  }

  interface Tables {
    users: User;
    posts: Post;
    comments: Comment;
    favorites: Favorite;
  }
}
