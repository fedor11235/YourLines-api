import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as session from 'express-session';
// import secureSession from '@fastify/secure-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 'yor-lines-key',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  app.useGlobalPipes(new ValidationPipe());
  const configSwagger = new DocumentBuilder()
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
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}
bootstrap();
