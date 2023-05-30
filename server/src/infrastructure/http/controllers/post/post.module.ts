import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";

@Module({
  controllers: [PostController],
  providers: [FavoriteController, CommentController],
})
export class PostModule {}
