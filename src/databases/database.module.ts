import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from './models/arrayOfModels';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'blazeanmol',
      password: 'Rubi@123',
      database: 'notes_project',
      models: models,
    }),
  ],
})
export class DatabaseModule {}
