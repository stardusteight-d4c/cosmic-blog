import {
  Post,
  IPostReflectObject,
  IPostRepository,
  IPostService,
  postBuilderFactory,
} from ".";
import Validators from "@/domain/@utils/validators";
import { IEventPublisher } from "../@interfaces";
import { IFavoriteRepository, IFavoriteService } from "../favorite";
import { ICommentService } from "../comment";

export class PostService implements IPostService {
  #postRepository: IPostRepository;
  #favoriteRepository: IFavoriteRepository;
  #publisher: IEventPublisher;

  constructor(implementations: {
    postRepository: IPostRepository;
    favoriteRepository: IFavoriteRepository;
    publisher: IEventPublisher;
  }) {
    this.#postRepository = implementations.postRepository;
    this.#favoriteRepository = implementations.favoriteRepository;
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
    const updatedPostReflect: IPostReflectObject = {
      ...post?.reflect!,
      favoriteAmount: await this.getFavoriteAmount(postId),
    };
    const updatedPostInstance = postBuilderFactory({
      post: updatedPostReflect,
    });
    return updatedPostInstance;
  }

  public async findPostByTitle(postTitle: string): Promise<Post | undefined> {
    Validators.checkPrimitiveType({ validating: postTitle, type: "string" });
    return await this.#postRepository.findByTitle(postTitle);
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

  public async getFavoriteAmount(postId: string): Promise<number> {
    return (await this.#favoriteRepository.findAllByPostId(postId)).length;
  }

  public async getCommentAmount(request: {
    postId: string;
    commentService: ICommentService;
  }): Promise<number> {
    const { postId, commentService } = request;
    return await commentService.getCommentAmountFromPost(postId);
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
