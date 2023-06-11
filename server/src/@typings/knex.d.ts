import { ISocialLinks, TUserRole } from '@/domain/src/user';
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

  interface Tables {
    users: User;
  }
}
