import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Put,
  Body,
  UseInterceptors,
  Param,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditingDTO } from '../../dto/editing.dto';
import { AuthGuard } from '@nestjs/passport';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Editing user' })
  @ApiParam({ name: 'id', required: true })
  @Put(':id')
  async editingUser(
    @Res() res,
    @Param('id') id: any,
    @Body() editingDTO: EditingDTO,
  ) {
    const result = await this.userService.editing(editingDTO, id);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Res() res, @Headers() headers) {
    const user = await this.userService.getUser(headers.authorization);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('all')
  async getAllUsers(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('link/:link')
  async getUsersByLink(@Res() res, @Param('link') link: string) {
    const user = await this.userService.getUsersByLink(link);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('search/:nickname')
  async searchUserByNickname(@Res() res, @Param('nickname') nickname: string) {
    const users = await this.userService.searchUserByNickname(nickname);
    return res.status(HttpStatus.OK).json(users);
  }
}
