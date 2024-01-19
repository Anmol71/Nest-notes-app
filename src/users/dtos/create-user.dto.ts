import { IsNotEmpty, IsString } from 'class-validator';
import { IsUnique } from 'src/auth/validations/unique.validation';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
