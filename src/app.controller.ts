import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';

@ApiTags('Test')
@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiExcludeEndpoint()
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
