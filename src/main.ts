import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useMiddleware } from './middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useMiddleware(app);
  await app.listen(3000);
}
bootstrap();
