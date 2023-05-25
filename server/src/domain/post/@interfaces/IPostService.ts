import { Post } from "..";
import {
  Comment,
  CreateCommentEvent,
  DeleteCommentEvent,
  ICommentService,
} from "@/domain/comment";
import { IPostReflectObject } from "./IPostReflectObject";
import { IFavoriteService } from "@/domain/favorite";

export interface IPostService {
  createPost(post: IPostReflectObject): Promise<Post>;
  updatePost(post: IPostReflectObject): Promise<Post>;
  findPostById(postId: string): Promise<Post | undefined>;
  findPostByTitle(postTitle: string): Promise<Post | undefined>;
  getPosts(): Promise<Post[]>;
  getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]>;
  getFavoriteAmount(postId: string): Promise<number>;
  getCommentAmount(request: {
    postId: string;
    commentService: ICommentService;
  }): Promise<number>;
  // deletar post

  // deletar post POR ID Emitir evento com o postId para comements e users
  // comments -> deletar todos comentários com o aquele postID e pegar o id dos usuarios emitir evento para usuario
  // users -> deletar todos os favorites com postID e
  // em um handler que tratará o evento vindo de comments subtrair -1 de commentedPosts

  // handlerToggleFavoritePostEvent(
  //   event: ToggleFavoritePostEvent,
  // ): Promise<Favorite | undefined>;
  // handlerCreateCommentEvent(
  //   event: CreateCommentEvent,
  // ): Promise<Comment | undefined>;
  // handlerDeleteCommentEvent(event: DeleteCommentEvent): Promise<void>;
}
