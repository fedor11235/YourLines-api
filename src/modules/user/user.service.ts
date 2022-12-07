import { Injectable } from '@nestjs/common';
import { EditingDTO } from '../../dto/editing.dto';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,

    private jwtService: JwtService,
  ) {}

  async getUser(refreshToken: any): Promise<any> {
    if (!refreshToken) {
      return false;
    }
    const decodeToken: any = this.jwtService.decode(refreshToken.slice(7));
    const user = await this.userModel.findOne({
      where: { id: decodeToken.id },
      relations: {
        notifications: true
      },
    });
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users
      .map((e) => {
        delete e.password;
        return e;
      })
      .reverse();
  }

  async getUsersByLink(link: string) {
    const user = await this.userModel.findOne({
      where: { link: link },
      relations: {
        posts: true
      },
    });
    delete user.password;
    return user;
  }

  async searchUserByNickname(nickname: string) {
    const users = await this.userModel.find({
      where: {
        nickname: Like(`%${nickname}%`),
      },
    });
    return users
      .map((e) => {
        delete e.password;
        return e;
      })
      .reverse();
  }

  async editing(body: EditingDTO, id: any): Promise<any> {
    const userToUpdate = await this.userModel.findOneBy({ id: id });
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
    return await this.userModel.save(userToUpdate);
  }
}
