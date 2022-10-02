import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('YouLines API')
    .setDescription('The YouLines API description')
    .setVersion('1.0')
    // .addApiKey({
    //   type: "apiKey",
    //   name: "X-API-KEY",
    //   in: "header",
    //   description: "Enter your API key"
    // }, "X-API-KEY")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
