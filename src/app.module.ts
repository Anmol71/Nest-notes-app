import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './databases/models/user.model';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { SharedNotesModule } from './shared-notes/shared-notes.module';

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'blazeanmol',
      password: 'Rubi@123',
      database: 'university',
      models: [UserModel],
    }),
    AuthModule,
    NotesModule,
    SharedNotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
