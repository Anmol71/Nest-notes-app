import { IsString } from 'class-validator';
import { IsUnique } from 'src/auth/validations/unique.validation';

export class UpdateEmailDto {
  @IsString()
  @IsUnique()
  public email: string;
}
