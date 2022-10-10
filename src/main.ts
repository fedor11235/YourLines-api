import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as session from 'express-session';
// import secureSession from '@fastify/secure-session';
import * as cookieParser from 'cookie-parser';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 'yor-lines-key',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  app.useGlobalPipes(new ValidationPipe());
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
  // app.use(cors())
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
