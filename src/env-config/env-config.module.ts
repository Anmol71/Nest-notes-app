import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './dbConfig';
import filesystem from './storageConfig';
import { clusterConfig } from './clusterConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, filesystem, clusterConfig],
      envFilePath: `${process.cwd()}/.env`,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class EnvConfigModule {}
