import Comment from "@/domain/comment/Comment";
import { Post } from "..";
import { CommentPostCommand, FavoritePostCommand } from "../PostCommands";
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
  publishCommentPost(
    comment: Comment,
    postId: string,
  ): Promise<Comment | undefined>;
  // CommandHandlers
  handlerFavoritePostCommand(
    favoritePostCommand: FavoritePostCommand,
  ): Promise<Post | undefined>;
  handlerCommentPost(
    commentPostCommand: CommentPostCommand,
  ): Promise<Comment | undefined>;
}
