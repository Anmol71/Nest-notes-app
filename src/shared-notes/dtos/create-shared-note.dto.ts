import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSharedNoteDto {
  @IsNotEmpty()
  @IsInt()
  public shared_with: number;
}
