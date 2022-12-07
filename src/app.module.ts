import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsUserModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { MessagesModule } from './modules/messages/messages.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { UserModule } from './modules/user/user.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
// import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    PostsUserModule,
    SubscriptionModule,
    MessagesModule,
    UserModule,
    BookmarkModule,
    NotificationsModule,
  ],
})
export class AppModule {}
