import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSharedNoteDto {
  @IsNotEmpty()
  @IsInt()
  public shared_from: number;

  @IsNotEmpty()
  @IsInt()
  public shared_with: number;

  @IsNotEmpty()
  @IsInt()
  public note_id: number;
}
