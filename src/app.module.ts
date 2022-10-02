import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserModule } from './auth-user/auth.module';
import { AuthSwaggerModule } from './auth-swagger/auth-swagger.module';
import { PostsUserModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/yourLines', {
      useNewUrlParser: true,
    }),
    AuthUserModule,
    AuthSwaggerModule,
    PostsUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
