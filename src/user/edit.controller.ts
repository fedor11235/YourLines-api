import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Put,
  Body,
  UseInterceptors,
  Param,
  Get,
  // Req,
  // UseGuards,
  // Session,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { EditService } from './edit.service';
import { EditingDTO } from './dto/editing.dto';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';

@ApiTags('User')
// @ApiSecurity("X-API-KEY", ["X-API-KEY"])
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
  // @FormDataRequest()
  @Put(':id')
  @UseInterceptors(FileInterceptor('formdata'))
  // @UseGuards(AuthGuard("api-key"))
  async editingUser(
    @Res() res,
    @Param('id') id: string,
    @Body() editingDTO: EditingDTO,
  ) {
    await this.editService.editing(editingDTO, id);
    return res.status(HttpStatus.OK).json('ok');
  }
}
