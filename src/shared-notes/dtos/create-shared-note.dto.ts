/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Transform,  } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSharedNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({allowNaN: false})
  @Transform(({value}) => parseFloat(value), {toClassOnly: true})
  public shared_with: number;
}
