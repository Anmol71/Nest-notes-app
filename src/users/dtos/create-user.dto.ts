import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/auth/validations/unique.validation';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
