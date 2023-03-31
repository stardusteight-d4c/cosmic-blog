import { randomUUID } from 'node:crypto'
import { User } from "./User";
import { Post } from "./Post";

export interface FavoriteObject {
  id: string;
  user: User;
  post: Post;
}

export class Favorite {
  id: string;
  user: User;
  post: Post;

  constructor(properties: FavoriteObject) {
    this.id = properties.id || randomUUID();
    this.user = properties.user;
    this.post = properties.post;
  }

  get object(): FavoriteObject {
    return {
      id: this.id,
      user: this.user,
      post: this.post,
    };
  }
}
