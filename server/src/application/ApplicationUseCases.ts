import type { ICommentRepository } from "@/@typings/comment";
import type { IFavoriteRepository } from "@/@typings/favorite";
import type { IPostRepository } from "@/@typings/post";
import type { IUserRepository } from "@/@typings/user";
import { PostService } from "@domain/src/post";
import { UserService } from "@domain/src/user";
import { Publisher } from "@/domain/helpers/Publisher";
import { CommentService, CommentObserver } from "@domain/src/comment";
import { FavoriteService, FavoriteObserver } from "@domain/src/favorite";
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
    const publisher = new Publisher();
    const postService = new PostService({
      postRepository: this.#postRepository,
      userRepository: this.#userRepository,
      favoriteRepository: this.#favoriteRepository,
      publisher,
    });
    const userService = new UserService({
      userRepository: this.#userRepository,
    });
    const commentService = new CommentService({
      commentRepository: this.#commentRepository,
      postRepository: this.#postRepository,
      userRepository: this.#userRepository,
    });
    const favoriteService = new FavoriteService({
      favoriteRepository: this.#favoriteRepository,
      postRepository: this.#postRepository,
      userRepository: this.#userRepository,
    });
    publisher.register(new CommentObserver(commentService));
    publisher.register(new FavoriteObserver(favoriteService));
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
