import { Module } from '@nestjs/common';
import { RouteListService } from './commands/route-list/route-list.service';

@Module({
  providers: [RouteListService],
})
export class CliCommandsModule {}
