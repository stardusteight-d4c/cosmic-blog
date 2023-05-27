import { IPostRepository, IPostService, PostService } from "@domain/post";
import { IUserRepository, IUserService, UserService } from "@domain/user";
import {
  CommentObserver,
  CommentService,
  ICommentRepository,
  ICommentService,
} from "@domain/comment";
import {
  FavoriteObserver,
  FavoriteService,
  IFavoriteRepository,
  IFavoriteService,
} from "@domain/favorite";
import { Publisher } from "@domain/@utils/Publisher";
import { UserUseCases } from "./use-cases/UserUseCases";
import { PostUseCases } from "./use-cases/PostUseCases";
import { CommentUseCases } from "./use-cases/CommentUseCases";
import { FavoriteUseCases } from "./use-cases/FavoriteUseCases";

export interface Initialization {
  services: {
    userService: IUserService;
    postService: IPostService;
    commentService: ICommentService;
    favoriteService: IFavoriteService;
  };
}

export class UseCasesApplication {
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
  }

  initialization() {
    const publisher = new Publisher();
    const postService = new PostService({
      postRepository: this.#postRepository,
      publisher,
    });
    const userService = new UserService({
      userRepository: this.#userRepository,
    });
    const commentService = new CommentService({
      commentRepository: this.#commentRepository,
    });
    const favoriteService = new FavoriteService({
      favoriteRepository: this.#favoriteRepository,
    });
    publisher.register(new CommentObserver(commentService));
    publisher.register(new FavoriteObserver(favoriteService));
    const init: Initialization = {
      services: {
        userService,
        postService,
        commentService,
        favoriteService,
      },
    };
    this.#postUseCases = new PostUseCases(init.services.postService);
    this.#userUseCases = new UserUseCases(init.services.userService);
    this.#commentUseCases = new CommentUseCases(init.services.commentService);
    this.#favoriteUseCases = new FavoriteUseCases(
      init.services.favoriteService,
    );
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
