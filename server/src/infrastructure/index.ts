import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "@app/in-memory-repositories";
import {
  PostPostgreSQLRepository,
  UserPostgreSQLRepository,
  CommentPostgreSQLRepository,
  FavoritePostgreSQLRepository,
} from "./database/postgresql/knex/postgresql-repositories";
import { ApplicationUseCases } from "@app/ApplicationUseCases";

/**
 * as the system classes are implementing the singleton pattern, an instance of
 * ApplicationUseCases is created and assigned to appInMemory variable, so they are not instanced
 * again in appPostgreSQL
 * 
 * incorrect:
 * export const appInMemory = new ApplicationUseCases(inMemoryRepository);
 * export const appPostgreSQL = new ApplicationUseCases(postgreSQLRepository);
 **/

const inMemoryRepository = {
  postRepository: PostInMemoryRepository.getInstance(),
  userRepository: UserInMemoryRepository.getInstance(),
  commentRepository: CommentInMemoryRepository.getInstance(),
  favoriteRepository: FavoriteInMemoryRepository.getInstance(),
};

const postgreSQLRepository = {
  postRepository: PostPostgreSQLRepository.getInstance(),
  userRepository: UserPostgreSQLRepository.getInstance(),
  commentRepository: CommentPostgreSQLRepository.getInstance(),
  favoriteRepository: FavoritePostgreSQLRepository.getInstance(),
};

export const app: ApplicationUseCases = (() => {
  const repository = process.env.REPOSITORY as "inmemory" | "postgresql";
  if (repository === "inmemory") {
    return new ApplicationUseCases(inMemoryRepository);
  }
  if (repository === "postgresql") {
    return new ApplicationUseCases(postgreSQLRepository);
  }
})();
