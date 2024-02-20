import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserModel } from 'src/databases/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiskStorageModule } from 'src/disk-storage/disk-storage.module';
import { CreateUserCommandService } from './commands/create-user-command.service';
import { CommandModule } from 'nestjs-command';
import { AuthService } from 'src/auth/services/auth.service';
import { DeleteUserCommandService } from './commands/delete-user-command.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    DiskStorageModule,
    CommandModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserCommandService,
    DeleteUserCommandService,
    AuthService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
