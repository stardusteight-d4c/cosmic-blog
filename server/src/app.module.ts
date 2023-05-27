import { Module } from '@nestjs/common';
import { AppController } from './infrastructure/src/app.controller';
import { AppService } from './infrastructure/src/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
