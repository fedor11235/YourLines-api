import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthSwaggerModule } from './auth-swagger/auth-swagger.module';
import { PostsUserModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
// import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/yourLines', {
      useNewUrlParser: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthSwaggerModule,
    PostsUserModule,
    // NestjsFormDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
