import { Knex } from "knex";
import { ISocialLinks, IUserReflectObject, TUserRole } from "./user";
import { OwnerMetadata, PostMetadata } from "./comment";
import { AuthorMetadata } from "./post";

declare module "knex/types/tables" {
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
    slug: string;
    tags: string[];
    coverImage: string;
    postedAt: Date;
    lastChange: Date;
    author: AuthorMetadata;
    created_at: string;
    updated_at: string;
  }

  interface Comment {
    id: string;
    content: string;
    post: PostMetadata;
    owner: OwnerMetadata;
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
