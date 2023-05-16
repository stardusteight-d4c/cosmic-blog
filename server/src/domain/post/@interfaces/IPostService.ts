import { Post } from "../Post";
import { FavoritePostCommand } from "../PostCommands";
import { IPostReflectObject } from "./IPostReflectObject";

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  findPostById(postId: string): Promise<Post | undefined>;
  // deixar um comentário
  // editar post

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