import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.SECRET_KEY));
  app.enableCors({
    origin: 'http://localhost:5173',//có thể đổi lại theo endpoint frontend để test, postman thì không cần
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Document API')
    .addCookieAuth(process.env.SECRET_KEY)
    .setDescription('API for online shop')
    .setVersion('1.0')
    .addTag('document')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);  
  SwaggerModule.setup('docs', app, documentFactory());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
