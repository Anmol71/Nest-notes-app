import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { models } from '../models/applicationModels';

@Injectable()
export class DbConnectionService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}
  public createSequelizeOptions(
    connectionName?: string,
  ): Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connectionName = connectionName || 'default';
    const config =
      this.configService.get<SequelizeModuleOptions>(`databases.default`);
    console.log('config', config);
    config.models = models;
    config.dialect = 'mysql';
    config.name = 'default';
    return config;
  }
}
