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

  // testar handleCommentPost
  // ao criar um post, deve-se também associar tal post ao atributo publishedPosts do usúario
  // -> deve ser publish/event/emissor

  
  // getPosts
  // getPostsByPagination

  

  // Event Publishers (issue of commands)
  publishFavoritePost(
    userId: string,
    postId: string,
  ): Promise<Post | undefined>;
  publishCommentPost(
    comment: Comment,
    postId: string,
  ): Promise<Comment | undefined>;
  // Event Handlers (capture of commands)
  handlerFavoritePost(
    favoritePostCommand: FavoritePostCommand,
  ): Promise<Post | undefined>;
  handlerCommentPost(
    commentPostCommand: CommentPostCommand,
  ): Promise<Comment | undefined>;
}
