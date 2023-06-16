import type { IPostRepository, IPostService } from "@typings/post";
import type { IUserRepository, IUserService } from "@typings/user";
import type { ICommentRepository, ICommentService } from "@typings/comment";
import type { IFavoriteRepository, IFavoriteService } from "@typings/favorite";
import { Publisher } from "@domain/Publisher";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";
import { CommentService, CommentSubscriber } from "../src/comment";
import { FavoriteService, FavoriteSubscriber } from "../src/favorite";
import { UserService, UserSubscriber } from "../src/user";
import { PostService, PostSubscriber } from "../src/post";

export interface IRepositories {
  post: IPostRepository;
  user: IUserRepository;
  comment: ICommentRepository;
  favorite: IFavoriteRepository;
}

export interface IServices {
  post: IPostService;
  user: IUserService;
  comment: ICommentService;
  favorite: IFavoriteService;
}

export function initializeInMemoryServices(): {
  services: IServices;
  repositories: IRepositories;
} {
  const postRepository = PostInMemoryRepository.getInstance();
  const userRepository = UserInMemoryRepository.getInstance();
  const favoriteRepository = FavoriteInMemoryRepository.getInstance();
  const commentRepository = CommentInMemoryRepository.getInstance();
  const publisher = Publisher.getInstance();
  const postService = new PostService({
    postRepository,
    publisher,
  });
  const userService = new UserService({
    userRepository,
    publisher,
  });
  const commentService = new CommentService({
    commentRepository,
    publisher,
  });
  const favoriteService = new FavoriteService({
    favoriteRepository,
    postRepository,
    userRepository,
  });
  publisher.register(UserSubscriber.getInstance(userService));
  publisher.register(PostSubscriber.getInstance(postService));
  publisher.register(CommentSubscriber.getInstance(commentService));
  publisher.register(FavoriteSubscriber.getInstance(favoriteService));
  return {
    services: {
      post: postService,
      user: userService,
      favorite: favoriteService,
      comment: commentService,
    },
    repositories: {
      post: postRepository,
      user: userRepository,
      comment: commentRepository,
      favorite: favoriteRepository,
    },
  };
}