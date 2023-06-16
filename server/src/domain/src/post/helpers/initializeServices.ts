import { Publisher } from "@domain/Publisher";
import { CommentService, CommentSubscriber } from "../../comment";
import { FavoriteService, FavoriteSubscriber } from "../../favorite";
import { UserService, UserSubscriber } from "../../user";
import { PostService, PostSubscriber } from "../";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";

export function initializeInMemoryServices() {
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
    postRepository,
    userRepository,
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
