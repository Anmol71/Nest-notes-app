import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  password: string;
}
