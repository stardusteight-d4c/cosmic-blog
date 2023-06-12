import { ISocialLinks, IUserReflectObject, TUserRole } from '@/domain/src/user';
import { Knex } from 'knex';

declare module 'knex/types/tables' {
  interface User {
    id: string;
    email: string;
    username: string;
    password: string
    avatar: string
    socialLinks: ISocialLinks
    userRole: TUserRole
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

  interface Tables {
    users: User;
    posts: Post;
  }
}
