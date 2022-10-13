import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';
import { Posts } from './entity/posts.entity';
import { User } from '../user/entity/user.entity';
import { Comments } from './entity/comments.entity';
import { CommentDTO } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentModel: Repository<Comments>,
    @InjectRepository(Posts) private readonly postModel: Repository<Posts>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async putComment(body: CommentDTO): Promise<any> {
    const user = await this.userModel.findOneBy({
      nickname: body.user,
    });
    console.log(user, 'user');
    const post = await this.postModel.findOneBy({
      id: body.post,
    });
    console.log(post, 'post');

    const comment: Comments = new Comments();
    comment.text = body.text;
    comment.user = user;
    comment.post = post;

    console.log(comment, 'comment');

    await this.commentModel.save(post);
    // const result = await this.userModel.find({
    //   where: {
    //     nickname: nickname,
    //   },
    //   relations: {
    //     posts: true,
    //   },
    // });
    return 'ok';
  }
}
