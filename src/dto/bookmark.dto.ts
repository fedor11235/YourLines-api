import { ApiProperty } from '@nestjs/swagger';

export class BookmarkDTO {
  @ApiProperty({ description: 'id post' })
  idPost: string;
}
