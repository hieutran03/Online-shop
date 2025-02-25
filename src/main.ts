import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:5173',//có thể đổi lại theo endpoint frontend để test, postman thì không cần
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
