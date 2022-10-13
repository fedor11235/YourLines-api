import {
  Controller,
  Res,
  HttpStatus,
  Put,
  Body,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { EditService } from './edit.service';
import { EditingDTO } from './dto/editing.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class EditController {
  constructor(private editService: EditService) {}

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
    await this.editService.editing(editingDTO, id);
    return res.status(HttpStatus.OK).json('ok');
  }
}
