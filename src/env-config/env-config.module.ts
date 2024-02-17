import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './dbConfig';
import filesystem from './stConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, filesystem],
      envFilePath: `${process.cwd()}/.env`,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class EnvConfigModule {}
