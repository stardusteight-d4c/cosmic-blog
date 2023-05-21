import { CommentPostEvent, FavoritePostEvent, Post } from "..";
import { Comment } from "@/domain/comment";
import { IPostReflectObject } from "./IPostReflectObject";
import { CreatePostEvent } from "../PostEvents";

export interface IPostService {
  updatePost(post: IPostReflectObject): Promise<Post>;
  findPostById(postId: string): Promise<Post | undefined>;
  findPostByTitle(postTitle: string): Promise<Post | undefined>;
    
  // ao criar um post, deve-se também associar tal post ao atributo publishedPosts do usúario
  // -> deve ser publish/event/emissor
  
  // getPosts
  // getPostsByPagination
  // add amount of comments attribute
  // add amount of favorites attribute

  

  // deletar post -> obersver -> deletar comentários -> favoritos
  


  // Event Emitters
  emitCreatePostEvent(post: IPostReflectObject): Promise<Post>;
  emitFavoritePostEvent(request: {
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
