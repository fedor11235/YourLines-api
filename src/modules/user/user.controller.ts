import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Put,
  Body,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditingDTO } from '../../dto/editing.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('edit')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Editing user' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: EditingDTO,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Put(':id')
  @UseInterceptors(FileInterceptor('formdata'))
  async editingUser(
    @Res() res,
    @Param('id') id: any,
    @Body() editingDTO: EditingDTO,
  ) {
    const result = await this.userService.editing(editingDTO, id);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get()
  @UseInterceptors(FileInterceptor('formdata'))
  async getAllUsers(@Res() res) {
    const usersAll = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(usersAll);
  }
}
