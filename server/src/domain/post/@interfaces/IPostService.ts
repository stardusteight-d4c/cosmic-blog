import { CommentPostEvent, FavoritePostEvent, Post } from "..";
import { Comment } from "@/domain/comment";
import { IPostReflectObject } from "./IPostReflectObject";
import { CreatePostEvent } from "../PostEvents";

export interface IPostService {
  updatePost(post: IPostReflectObject): Promise<Post>;
  findPostById(postId: string): Promise<Post | undefined>;
  findPostByTitle(postTitle: string): Promise<Post | undefined>;
  getPosts(): Promise<Post[]>;
  getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]>;
  // deletar post -> obersver -> deletar comentários -> favoritos

  // deletar comentario

  // Event Emitters
  emitCreatePostEvent(post: IPostReflectObject): Promise<Post>;
  emitToggleFavoritePostEvent(request: {
    userId: string;
    postId: string;
  }): Promise<Post | undefined>;
  emitCommentPostEvent(comment: Comment): Promise<Comment | undefined>;

  // Event Handlers
  handlerFavoritePostEvent(event: FavoritePostEvent): Promise<Post | undefined>;
  handlerCommentPostEvent(
    event: CommentPostEvent,
  ): Promise<Comment | undefined>;
  handlerCreatePostEvent(event: CreatePostEvent): Promise<Post | undefined>;
}
