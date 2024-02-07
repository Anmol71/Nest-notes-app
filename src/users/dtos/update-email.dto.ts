import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsUnique } from 'src/auth/validations/unique.validation';

export class UpdateEmailDto {
  @IsString()
  @IsUnique()
  @ApiProperty()
  public email: string;
}
