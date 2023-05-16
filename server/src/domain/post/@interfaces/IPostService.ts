import { Post } from "..";
import { FavoritePostCommand } from "../PostCommands";
import { IPostReflectObject } from "./IPostReflectObject";

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  updatePost(post: IPostReflectObject): Promise<Post>; // testar
  // deletar post
  findPostById(postId: string): Promise<Post | undefined>;
  // buscar por título


  // CommandPublishers
  publishFavoritePostCommand(
    userId: string,
    postId: string,
  ): Promise<Post | undefined>;
  // CommandHandlers
  handlerFavoritePostCommand(
    command: FavoritePostCommand,
  ): Promise<Post | undefined>;
  // handlerLeaveCommentPost
}
