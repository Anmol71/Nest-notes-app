import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controller/users.controller';
import { UserModel } from 'src/databases/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
