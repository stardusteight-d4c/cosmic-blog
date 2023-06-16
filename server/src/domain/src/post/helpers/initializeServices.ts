import { Publisher } from "@domain/Publisher";
import { CommentObserver, CommentService } from "../../comment";
import { FavoriteObserver, FavoriteService } from "../../favorite";
import { UserService } from "../../user";
import { PostService } from "../PostService";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";
import { UserObserver } from "../../user/UserObserver";

export function initializeInMemoryServices() {
  const postRepository = PostInMemoryRepository.getInstance();
  const userRepository = UserInMemoryRepository.getInstance();
  const favoriteRepository = FavoriteInMemoryRepository.getInstance();
  const commentRepository = CommentInMemoryRepository.getInstance();
  const publisher = Publisher.getInstance();
  const postService = new PostService({
    postRepository,
    favoriteRepository,
    publisher,
  });
  const userService = new UserService({
    userRepository,
    publisher,
  });
  const favoriteService = new FavoriteService({
    favoriteRepository,
    postRepository,
    userRepository,
  });
  const commentService = new CommentService({
    commentRepository,
    postRepository,
    userRepository,
  });
  publisher.register(new FavoriteObserver(favoriteService));
  publisher.register(new CommentObserver(commentService));
  console.log('UserObserver');
  
  publisher.register(UserObserver.getInstance(userService));
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
