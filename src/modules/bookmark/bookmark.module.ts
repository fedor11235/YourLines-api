import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from '../../entities/bookmark.entity';
import { Posts } from '../../entities/posts.entity';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Posts, User])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
