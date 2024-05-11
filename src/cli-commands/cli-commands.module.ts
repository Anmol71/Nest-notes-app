import { Logger, Module } from '@nestjs/common';
import { RouteListService } from './commands/route-list/route-list.service';
import { SeederService } from './seeder/seeder.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [RouteListService, Logger, SeederService],
})
export class CliCommandsModule {}
