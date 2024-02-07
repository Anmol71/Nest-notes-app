import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSharedNoteDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  public shared_with: number;
}
