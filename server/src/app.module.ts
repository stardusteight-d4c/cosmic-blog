import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PostModule } from "@infra/http/controllers/post/post.module";
import { UserModule } from "@infra/http/controllers/user/user.module";

@Module({
  imports: [ConfigModule.forRoot(), PostModule, UserModule],
})
export class AppModule {}
