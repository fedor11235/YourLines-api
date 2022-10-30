import { Injectable } from '@nestjs/common';
import { BookmarkDTO } from '../../dto/bookmark.dto';
import { Bookmark } from '../../entities/bookmark.entity';
import { User } from '../../entities/user.entity';
import { Posts } from '../../entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark) private readonly bookmarkModel: Repository<Bookmark>,
    @InjectRepository(Posts) private readonly postModel: Repository<Posts>,
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async getAllBookmark() {
    const bookmarkAll =  this.bookmarkModel.find()
    return bookmarkAll
  }

  async addBookmark(editingDTO: BookmarkDTO, id: any) {
    const users = this.userModel.findOneBy({ id: id });
    const posts = this.postModel.findOneBy({ id: id });
    const bookmark:Bookmark = new Bookmark
    bookmark.post = posts[0]
    bookmark.user = users[0]
    this.bookmarkModel.save(bookmark)
    return 'ok'
  }
}
