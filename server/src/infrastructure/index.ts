import { ApplicationUseCases } from "@app/ApplicationUseCases";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";

export const appInMemory = new ApplicationUseCases({
  postRepository: PostInMemoryRepository.getInstance(),
  userRepository: UserInMemoryRepository.getInstance(),
  commentRepository: CommentInMemoryRepository.getInstance(),
  favoriteRepository: FavoriteInMemoryRepository.getInstance(),
});

// export const appMySQL 
