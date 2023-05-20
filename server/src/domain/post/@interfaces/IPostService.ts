import { CommentPostEvent, FavoritePostEvent, Post } from "..";
import { Comment } from "@/domain/comment";
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

  // Event Publishers
  emitFavoritePostEvent(
    userId: string,
    postId: string,
  ): Promise<Post | undefined>;
  emitCommentPostEvent(
    comment: Comment,
    postId: string,
  ): Promise<Comment | undefined>;
  // Event Handlers
  handlerFavoritePostEvent(
    favoritePostEvent: FavoritePostEvent,
  ): Promise<Post | undefined>;
  handlerCommentPostEvent(
    commentPostEvent: CommentPostEvent,
  ): Promise<Comment | undefined>;
}
