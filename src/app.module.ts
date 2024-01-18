import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { SharedNotesModule } from './shared-notes/shared-notes.module';
import { DatabaseModule } from './databases/database.module';
import { EnvConfigModule } from './env-config/env-config.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    NotesModule,
    SharedNotesModule,
    DatabaseModule,
    EnvConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
