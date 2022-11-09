import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts } from '../../entities/posts.entity';
import { User } from '../../entities/user.entity';
import { Comments } from '../../entities/comments.entity';
import { CommentDTO } from '../../dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentModel: Repository<Comments>,
    @InjectRepository(Posts) private readonly postModel: Repository<Posts>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}
  async putComment(body: any): Promise<any> {
    const user = await this.userModel.findOneBy({
      id: body.userId,
    });

    const post = await this.postModel.findOneBy({
      id: body.postId,
    });

    const comment: Comments = new Comments();
    comment.text = body.text;
    comment.user = user;
    comment.post = post;

    await this.commentModel.save(comment);
    return 'ok';
  }

  async deleteComment(id: any): Promise<any> {
    const commentToDelete = await this.commentModel.findOneBy({ id: id });
    this.commentModel.remove(commentToDelete);
    return 'ok';
  }

  // async addLike(id: any): Promise<any> {
  //   const commentToLike = await this.commentModel.findOneBy({ id: id });
  //   if (commentToLike.likes) {
  //     commentToLike.likes += 1;
  //   }
  //   commentToLike.likes = 1;
  //   this.commentModel.save(commentToLike);
  //   return 'ok';
  // }
}
