import {
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';
import { DiskStorageService } from 'src/disk-storage/services/disk-storage.service';

export class updateProfileDto {
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  file: DiskStorageService
}
