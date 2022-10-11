import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDTO } from './dto/auth.dto';
import { RegistrationDTO } from './dto/registration.dto';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async loginUser(body: AuthDTO): Promise<User | boolean> {
    const user = await this.userModel.findOneBy({
      email: body.email,
      password: body.password,
    });

    if (!user) {
      return false;
    }

    return user;
  }

  async registryUser(body: RegistrationDTO): Promise<User | boolean> {
    const ifUser = await this.userModel.findOneBy({
      email: body.email,
      password: body.password,
    });

    if (ifUser) {
      return false;
    }

    const user: User = new User();

    user.nickname = body.nickname;
    user.email = body.email;
    user.password = body.password;

    return await this.userModel.save(user);
  }
}
