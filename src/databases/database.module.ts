import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DbConnectionService } from './services/db-connection.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DbConnectionService,
      imports: [ConfigModule],
      name: 'default',
    }),
  ],
  providers: [DbConnectionService, ConfigService],
})
export class DatabaseModule {}
