import { Injectable } from '@nestjs/common';
import { EditingDTO } from './dto/editing.dto';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EditService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async editing(body: EditingDTO, nickname: any): Promise<void> {
    const userToUpdate = await this.userModel.findOneBy({
      nickname: nickname,
    });
    if (body.email) {
      userToUpdate.email = body.email;
    }
    if (body.password) {
      userToUpdate.password = body.password;
    }
    if (body.nickname) {
      userToUpdate.nickname = body.nickname;
    }
    if (body.link) {
      userToUpdate.link = body.link;
    }
    if (body.description) {
      userToUpdate.description = body.description;
    }
    if (body.webSite) {
      userToUpdate.webSite = body.webSite;
    }
    if (body.wishList) {
      userToUpdate.wishList = body.wishList;
    }
    if (body.avatar) {
      userToUpdate.avatar = body.avatar;
    }
    if (body.headerImage) {
      userToUpdate.headerImage = body.headerImage;
    }
    await this.userModel.save(userToUpdate);
  }
}
