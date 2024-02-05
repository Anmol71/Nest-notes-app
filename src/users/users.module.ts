import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserModel } from 'src/databases/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiskStorageModule } from 'src/disk-storage/disk-storage.module';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), DiskStorageModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
