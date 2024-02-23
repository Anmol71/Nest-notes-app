import { Logger, Module } from '@nestjs/common';
import { RouteListService } from './commands/route-list/route-list.service';

@Module({
  providers: [RouteListService, Logger],
})
export class CliCommandsModule {}
