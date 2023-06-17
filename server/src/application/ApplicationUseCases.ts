import type { ICommentRepository } from "@typings/comment";
import type { IFavoriteRepository } from "@typings/favorite";
import type { IPostRepository } from "@typings/post";
import type { IUserRepository } from "@typings/user";
import { Publisher } from "@domain/Publisher";
import { PostService, PostSubscriber } from "@domain/src/post";
import { UserService, UserSubscriber } from "@domain/src/user";
import { CommentService, CommentSubscriber } from "@domain/src/comment";
import { FavoriteService, FavoriteSubscriber } from "@domain/src/favorite";
import { UserUseCases } from "./use-cases/UserUseCases";
import { PostUseCases } from "./use-cases/PostUseCases";
import { CommentUseCases } from "./use-cases/CommentUseCases";
import { FavoriteUseCases } from "./use-cases/FavoriteUseCases";

export class ApplicationUseCases {
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;
  #commentRepository: ICommentRepository;
  #favoriteRepository: IFavoriteRepository;
  #userUseCases: UserUseCases;
  #postUseCases: PostUseCases;
  #commentUseCases: CommentUseCases;
  #favoriteUseCases: FavoriteUseCases;

  constructor(repositories: {
    postRepository: IPostRepository;
    userRepository: IUserRepository;
    commentRepository: ICommentRepository;
    favoriteRepository: IFavoriteRepository;
  }) {
    this.#postRepository = repositories.postRepository;
    this.#userRepository = repositories.userRepository;
    this.#commentRepository = repositories.commentRepository;
    this.#favoriteRepository = repositories.favoriteRepository;
    this.initialization();
  }

  private initialization() {
    const publisher = Publisher.getInstance();
    const postService = new PostService(this.#postRepository);
    const userService = new UserService(this.#userRepository);
    const commentService = new CommentService(this.#commentRepository);
    const favoriteService = new FavoriteService(this.#favoriteRepository);
    publisher.register(UserSubscriber.getInstance(userService));
    publisher.register(PostSubscriber.getInstance(postService));
    publisher.register(CommentSubscriber.getInstance(commentService));
    publisher.register(FavoriteSubscriber.getInstance(favoriteService));
    this.#postUseCases = new PostUseCases(postService);
    this.#userUseCases = new UserUseCases(userService);
    this.#commentUseCases = new CommentUseCases(commentService);
    this.#favoriteUseCases = new FavoriteUseCases(favoriteService);
  }

  public getPostUsesCases(): PostUseCases {
    return this.#postUseCases;
  }

  public getUserUsesCases(): UserUseCases {
    return this.#userUseCases;
  }

  public getCommentUsesCases(): CommentUseCases {
    return this.#commentUseCases;
  }

  public getFavoriteUsesCases(): FavoriteUseCases {
    return this.#favoriteUseCases;
  }
}
