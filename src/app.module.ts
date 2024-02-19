import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { SharedNotesModule } from './shared-notes/shared-notes.module';
import { DatabaseModule } from './databases/database.module';
import { EnvConfigModule } from './env-config/env-config.module';
import { MethodModifierMiddleware } from './common/method-modifier.middleware';
import { EmailModule } from './email/email.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppClusterService } from './common/services/app-cluster.service';
import { CliCommandsModule } from './cli-commands/cli-commands.module';

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
    CliCommandsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppClusterService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MethodModifierMiddleware).forRoutes('*');
  }
}
