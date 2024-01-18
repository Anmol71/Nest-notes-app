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
  public createSequelizeOptions() // connectionName?: string,
  : Promise<SequelizeModuleOptions> | SequelizeModuleOptions {
    // connectionName = connectionName || 'baseConnection';
    const config = this.configService.get<SequelizeModuleOptions>('dbConfig');
    console.log(config);
    config.models = models;
    config.dialect = 'mysql';
    return config;
  }
}
