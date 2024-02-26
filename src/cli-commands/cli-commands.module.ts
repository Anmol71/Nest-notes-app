import { Logger, Module } from '@nestjs/common';
import { RouteListService } from './commands/route-list/route-list.service';
import { SeederService } from './seeder/seeder.service';

@Module({
  providers: [RouteListService, Logger, SeederService],
})
export class CliCommandsModule {}
