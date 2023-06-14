import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/@in-memory-repositories";
import {
  PostPostgreSQLRepository,
  UserPostgreSQLRepository,
  CommentPostgreSQLRepository,
  FavoritePostgreSQLRepository,
} from "./database/postgresql/knex/@postgresql-repositories";
import { ApplicationUseCases } from "@app/ApplicationUseCases";

export const appInMemory = new ApplicationUseCases({
  postRepository: PostInMemoryRepository.getInstance(),
  userRepository: UserInMemoryRepository.getInstance(),
  commentRepository: CommentInMemoryRepository.getInstance(),
  favoriteRepository: FavoriteInMemoryRepository.getInstance(),
});

export const appPostgreSQL = new ApplicationUseCases({
  postRepository: PostPostgreSQLRepository.getInstance(),
  userRepository: UserPostgreSQLRepository.getInstance(),
  commentRepository: CommentPostgreSQLRepository.getInstance(),
  favoriteRepository: FavoritePostgreSQLRepository.getInstance(),
});
