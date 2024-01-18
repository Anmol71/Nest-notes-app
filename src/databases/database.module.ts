import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DbConnectionService } from './services/db-connection.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: DbConnectionService,
      imports: [ConfigModule],
      name: 'baseConnection',
    }),
  ],
  providers: [DbConnectionService, ConfigService],
})
export class DatabaseModule {}
