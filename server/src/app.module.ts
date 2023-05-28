import { Module } from "@nestjs/common";
import { PostModule } from "./infrastructure/http/controllers/post/post.module";

@Module({
  imports: [PostModule],
})
export class AppModule {}
