import { Module } from '@nestjs/common';
import { StorageModule } from '@squareboat/nest-storage';
import { DiskStorageService } from './services/disk-storage.service';

@Module({
  imports: [StorageModule.registerAsync({ useClass: DiskStorageService })],
  providers: [DiskStorageService],
})
export class DiskStorageModule {}
