import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SharedNotesService } from '../services/shared-notes.service';

import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shared-notes')
@UseGuards(AuthGuard)
@Controller('shared-notes')
export class SharedNotesController {
  constructor(private readonly sharedNotesService: SharedNotesService) {}

  @Get()
  public async notesSharedToMe(
    @Query('page') page: number,
    @AuthUser() user: UserModel,
  ): Promise<SharedNoteModel[]> {
    return this.sharedNotesService.notesSharedToMe(user.id);
  }
}
