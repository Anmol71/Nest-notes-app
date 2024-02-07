import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  public hidden: boolean;
}
