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

    const post = await this.postModel.findOneBy({
      id: body.post,
    });

    const comment: Comments = new Comments();
    comment.text = body.text;
    comment.user = user;
    comment.post = post;

    console.log(comment, 'comment');

    await this.commentModel.save(comment);
    return 'ok';
  }

  async deleteComment(id: any): Promise<any> {
    const commentToDelete = await this.commentModel.findOneBy({ id: id });
    this.commentModel.remove(commentToDelete);
    return 'ok';
  }

  async addLike(id: any): Promise<any> {
    const commentToLike = await this.commentModel.findOneBy({ id: id });
    if (commentToLike.likes) {
      commentToLike.likes += 1;
    }
    commentToLike.likes = 1;
    this.commentModel.save(commentToLike);
    return 'ok';
  }
}
