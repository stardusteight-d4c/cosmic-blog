import { Post, FavoritePostEvent, CreatePostEvent } from "..";
import { Comment, CreateCommentEvent, DeleteCommentEvent } from "@/domain/comment";
import { IPostReflectObject } from "./IPostReflectObject";

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

  // Event Emitters
  emitCreatePostEvent(post: IPostReflectObject): Promise<Post>;
  emitToggleFavoritePostEvent(request: {
    userId: string;
    postId: string;
  }): Promise<Post | undefined>;
  // Event Handlers
  handlerFavoritePostEvent(event: FavoritePostEvent): Promise<Post | undefined>;
  handlerCreateCommentEvent(
    event: CreateCommentEvent,
  ): Promise<Comment | undefined>;
  handlerCreatePostEvent(event: CreatePostEvent): Promise<Post | undefined>;
  handlerDeleteCommentEvent(event: DeleteCommentEvent): Promise<void>;
}
