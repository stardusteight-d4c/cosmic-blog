import { Module } from "@nestjs/common";
import { UseCasesApplication } from "./application";
import { PostController } from "./infrastructure/controllers/post.controller";
import {
  CommentInMemoryRepository,
  FavoriteInMemoryRepository,
  PostInMemoryRepository,
  UserInMemoryRepository,
} from "./application/@in-memory-repositories";

const app = new UseCasesApplication({
  userRepository: UserInMemoryRepository.getInstance(),
  postRepository: PostInMemoryRepository.getInstance(),
  commentRepository: CommentInMemoryRepository.getInstance(),
  favoriteRepository: FavoriteInMemoryRepository.getInstance(),
});

@Module({
  imports: [],
  controllers: [PostController],
  providers: [
    UseCasesApplication,
    PostInMemoryRepository,
    UserInMemoryRepository,
    CommentInMemoryRepository,
    FavoriteInMemoryRepository,
    {
      provide: UseCasesApplication,
      useFactory: (
        postRepository,
        userRepository,
        commentRepository,
        favoriteRepository,
      ) => {
        return new UseCasesApplication({
          postRepository,
          userRepository,
          commentRepository,
          favoriteRepository,
        });
      },
      inject: [
        PostInMemoryRepository,
        UserInMemoryRepository,
        CommentInMemoryRepository,
        FavoriteInMemoryRepository,
      ],
    },
  ],
})
export class AppModule {}
