import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entity/posts.entity';
import { User } from '../user/entity/user.entity';
import { Comments } from './entity/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, User, Comments])],
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
})
export class PostsUserModule {}
