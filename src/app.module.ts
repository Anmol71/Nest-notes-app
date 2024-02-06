import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { SharedNotesModule } from './shared-notes/shared-notes.module';
import { DatabaseModule } from './databases/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { EmailModule } from './email/email.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    NotesModule,
    SharedNotesModule,
    DatabaseModule,
    EnvConfigModule,
    EmailModule,
    NestjsFormDataModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
