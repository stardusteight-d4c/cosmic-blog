import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { FavoriteController } from "../favorite/favorite.controller";
import { CommentController } from "../comment/comment.controller";

@Module({
  controllers: [UserController],
  providers: [FavoriteController, CommentController],
})
export class UserModule {}
