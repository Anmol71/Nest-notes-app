import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/auth/validations/unique.validation';

export class UpdateEmailDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @IsUnique()
  @ApiProperty()
  public email: string;
}
