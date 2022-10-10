import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthSwaggerModule } from './auth-swagger/auth-swagger.module';
import { PostsUserModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
// import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/yourLines', {
      useNewUrlParser: true,
    }),
    UserModule,
    AuthSwaggerModule,
    PostsUserModule,
    // NestjsFormDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
