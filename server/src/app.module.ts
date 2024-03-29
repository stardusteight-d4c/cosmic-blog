import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostModule } from "@infra/http/controllers/post/post.module";
import { UserModule } from "@infra/http/controllers/user/user.module";
import { FavoriteModule } from "@infra/http/controllers/favorite/favorite.module";
import { CommentModule } from "./infrastructure/http/controllers/comment/comment.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostModule,
    UserModule,
    FavoriteModule,
    CommentModule,
  ],
})
export class AppModule {}
