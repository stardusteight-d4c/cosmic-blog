import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  postBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { IEventPublisher } from "../@interfaces";
import { IFavoriteRepository } from "../favorite";
import { ICommentRepository } from "../comment";

export class PostService implements IPostService {
  #postRepository: IPostRepository;
  #publisher: IEventPublisher;

  constructor(implementations: {
    postRepository: IPostRepository;
    publisher: IEventPublisher;
  }) {
    this.#postRepository = implementations.postRepository;
    this.#publisher = implementations.publisher;
  }

  public async createPost(post: IPostReflectObject): Promise<Post> {
    const newPost = postBuilderFactory({ post });
    const postInstance = await this.#postRepository.create(newPost);
    return postInstance;
  }

  public async updatePost(post: IPostReflectObject): Promise<Post> {
    const updatedPost = postBuilderFactory({ post });
    const updatedPostInstance = await this.#postRepository.update(updatedPost);
    return updatedPostInstance;
  }

  public async findPostById(postId: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const post = await this.#postRepository.findById(postId);
    return post;
  }

  public async findPostByTitle(postTitle: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postTitle, type: "string" });
    const post = await this.#postRepository.findByTitle(postTitle);
    return post;
  }

  public async getPosts(): Promise<Post[]> {
    const posts = await this.#postRepository.get();
    return posts;
  }

  public async getPostsByPagination(request: {
    skip: number;
    pageSize: number;
  }): Promise<Post[]> {
    const { skip, pageSize } = request;
    const posts = await this.#postRepository.getByPagination({
      skip,
      pageSize,
    });
    return posts;
  }

  // public async handlerToggleFavoritePostEvent(
  //   event: ToggleFavoritePostEvent,
  // ): Promise<Favorite | undefined> {
  //   const { favorite, operation } = event;
  //   const favoriteInstance = await handleFavoriteAmount({
  //     postRepository: this.#postRepository,
  //     favorite,
  //     operation,
  //   });
  //   return favoriteInstance;
  // }

  // public async handlerCreateCommentEvent(
  //   event: CreateCommentEvent,
  // ): Promise<Comment | undefined> {
  //   const { comment } = event;
  //   const result = await handleCommentAmountPost({
  //     postRepository: this.#postRepository,
  //     comment,
  //     action: "sum",
  //   });
  //   return result;
  // }

  // public async handlerDeleteCommentEvent(
  //   event: DeleteCommentEvent,
  // ): Promise<void> {
  //   const { comment } = event;
  //   await handleCommentAmountPost({
  //     postRepository: this.#postRepository,
  //     comment,
  //     action: "sub",
  //   });
  // }
}
