import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';
export class UpdateProfileDto {
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsFile()
  public avatar: FileSystemStoredFile;
}
