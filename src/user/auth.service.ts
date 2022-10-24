import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationDTO } from './dto/registration.dto';
import { User } from './entity/user.entity';
import { Token } from './entity/token.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>,

    @InjectRepository(Token)
    private readonly tokenModel: Repository<Token>,

    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOneBy({
      email: email,
      password: password,
    });
    if (user) {
      return user;
    }
    return false;
  }

  async loginUser(body: any): Promise<any> {
    let email;
    if (body.email) {
      email = body.email;
    } else {
      email = body.login;
    }
    const user = await this.validateUser(email, body.password);

    if (user) {
      const newToken = this.jwtService.sign({ id: user.id })
      const userToken = await this.tokenModel.findOneBy([{ userId: user.id }]);
      if(!userToken) {
        const token = new Token();
        token.userId = user.id
        token.token = newToken
        await this.tokenModel.save(token);
      } else {
        userToken.token = newToken
        await this.tokenModel.save(userToken);
      }
      return {
        token: newToken,
      };
    }
    return false;
  }

  async registryUser(body: RegistrationDTO): Promise<any> {
    const ifUser = await this.userModel.findOneBy([
      { email: body.email },
      { nickname: body.nickname },
      { link: body.nickname.toLowerCase().replace(/ /g, '_') },
    ]);

    if (ifUser) {
      return false;
    }

    const user = new User();

    user.nickname = body.nickname;
    user.link = body.nickname.toLowerCase().replace(/ /g, '_');
    user.email = body.email;
    user.password = body.password;

    return await this.userModel.save(user);
  }

  async getUser(refreshToken: any): Promise<any> {
    if(!refreshToken) {
      return false
    }
    const decodeToken: any = this.jwtService.decode(refreshToken.slice(7))
    const user = await this.userModel.findOneBy([{id: decodeToken.id}])
    return user;
  }

  async userRefreshToken(refreshToken: any) {
    const decodeToken: any = this.jwtService.decode(refreshToken.slice(7))
    const userToken = await this.tokenModel.findOneBy([
      { userId: decodeToken.id },
      { token: refreshToken.slice(7) },
    ]);
    if (userToken) {
      const newToken = this.jwtService.sign({ id: decodeToken.id });
      userToken.token = newToken;
      await this.tokenModel.save(userToken);
      return newToken;
    }
    return false;
  }

  async deleteUser(token: any): Promise<any> {
    const decodeToken: any = this.jwtService.decode(token.slice(7))
    const userRemoveToken = await this.tokenModel.findOneBy([{ userId: decodeToken.id }]);
    this.tokenModel.remove(userRemoveToken);
    return 'ok';
  }
}
