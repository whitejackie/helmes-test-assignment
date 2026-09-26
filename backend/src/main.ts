import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { initDatabase } from './database/init.js';

async function bootstrap() {
  await initDatabase();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
