import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { FavoriteController } from "../favorite/favorite.controller";

@Module({
  controllers: [PostController],
  providers: [FavoriteController]
})
export class PostModule {}
