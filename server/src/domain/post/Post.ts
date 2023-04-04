import { FavoritePostCommand } from ".";
import { User, IUserReflectObject } from "@domain/user";
import { Comment, ICommentReflectObject } from "@domain/comment";
import { Favorite, IFavoriteReflectObject } from "@domain/favorite";

export interface IPostReflectObject {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedIn: Date;
  lastChange?: Date;
  author: IUserReflectObject;
  favorites?: IFavoriteReflectObject[];
  comments?: ICommentReflectObject[];
}

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  deletePost(postId: string): Promise<Post | undefined>;
  findPostById(postId: string): Promise<Post | undefined>;
  toggleFavorite(updatedPost: Post): Promise<Post>;
}

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  findPostById(postId: string): Promise<Post | undefined>;
  // CommandPublishers
  publishFavoritePostCommand(
    userId: string,
    postId: string,
  ): Promise<Post | undefined>;
  // CommandHandlers
  handlerFavoritePostCommand(
    command: FavoritePostCommand,
  ): Promise<Post | undefined>;
}

export class Post {
  #id: string;
  #title: string;
  #body: string;
  #tags: string[];
  #coverImage: string;
  #postedIn: Date;
  #lastChange?: Date;
  #author: User;
  #favorites: Favorite[] = [];
  #comments: Comment[] = [];

  constructor(properties: IPostReflectObject) {
    this.#id = properties.id!;
    this.#title = properties.title;
    this.#body = properties.body;
    this.#tags = properties.tags;
    this.#coverImage = properties.coverImage;
    this.#postedIn = properties.postedIn;
    this.#lastChange = properties.lastChange;
    this.#author = new User(properties.author);
    this.#favorites = properties.favorites
      ? properties.favorites.map((favorite) => new Favorite(favorite))
      : [];
    this.#comments = properties.comments
      ? properties.comments.map((comment) => new Comment(comment))
      : [];
  }

  public get reflect(): IPostReflectObject {
    return {
      id: this.#id,
      title: this.#title,
      body: this.#body,
      tags: this.#tags,
      coverImage: this.#coverImage,
      postedIn: this.#postedIn,
      lastChange: this.#lastChange,
      author: this.#author.reflect,
      favorites: this.#favorites.map((favorite) => favorite.reflect),
      comments: this.#comments.map((comment) => comment.reflect),
    };
  }

  // get tags(): string[] {
  //   return this._tags;
  // }

  // set tags(value: string[]) {
  //   if (value.length > 4) {
  //     throw new Error("The maximum number of tags allowed is 4.");
  //   }
  //   this._tags = value;
  // }

  // // public canEdit(author: User): boolean {
  // //   return this.author.id === author.id
  // // }
}
