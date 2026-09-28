import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SectorsModule } from './sectors/sectors.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [SectorsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
