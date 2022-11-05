import { Injectable } from '@nestjs/common';
import { BookmarkDTO } from '../../dto/bookmark.dto';
import { Bookmark } from '../../entities/bookmark.entity';
import { User } from '../../entities/user.entity';
import { Posts } from '../../entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkModel: Repository<Bookmark>,
    @InjectRepository(Posts) private readonly postModel: Repository<Posts>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getAllBookmark(token: string) {
    const decodeToken: any = this.jwtService.decode(token.slice(7));
    const user = await this.userModel.findOne({
      where: { id: decodeToken.id },
      relations: {
        bookmark: true,
      },
    });

    const bookmarkIds = user.bookmark.map((e) => e.id);

    const bookmarks = await this.bookmarkModel.find({
      where: { id: In(bookmarkIds) },
      relations: {
        user: true,
        post: true,
      },
    });

    return bookmarks.reverse();
  }

  async addBookmark(token: string, idPost: any, idUsersPosts: any) {
    const decodeToken: any = this.jwtService.decode(token.slice(7));
    const user = await this.userModel.findOneBy({ id: decodeToken.id });
    const usersPost = await this.userModel.findOneBy({ id: idUsersPosts });

    const post = await this.postModel.findOneBy({ id: idPost });
    const bookmark = new Bookmark();

    bookmark.post = post;
    bookmark.user = user;
    bookmark.usersPost = usersPost;

    this.bookmarkModel.save(bookmark);
    return 'ok';
  }
}
