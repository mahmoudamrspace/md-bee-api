import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class encountersDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
