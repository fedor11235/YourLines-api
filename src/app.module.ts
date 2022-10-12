import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { PostsUserModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthSwaggerModule } from './auth-swagger/auth-swagger.module';
import { SubscriptionModule } from './subscription/subscription.module';
// import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthSwaggerModule,
    PostsUserModule,
    SubscriptionModule,
    // NestjsFormDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
