import { Post } from "..";
import { FavoritePostCommand } from "../PostCommands";
import { IPostReflectObject } from "./IPostReflectObject";

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  updatePost(post: IPostReflectObject): Promise<Post>; 
  // deletar post -> obersver -> deletar comentários -> favoritos
  findPostById(postId: string): Promise<Post | undefined>;
  findPostByTitle(postTitle: string): Promise<Post | undefined>;

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
