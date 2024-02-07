import { Controller, Get, UseGuards } from '@nestjs/common';
import { SharedNotesService } from '../services/shared-notes.service';

// import { UpdateSharedNoteDto } from '../dtos/update-shared-note.dto';
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
  // @Post()
  // create(
  //   @AuthUser() user: number,
  //   @Body() createSharedNoteDto: CreateSharedNoteDto,
  // ) {
  //   return this.sharedNotesService.create(createSharedNoteDto, user);
  // }

  @Get()
  public async notesSharedToMe(
    @AuthUser() user: UserModel,
  ): Promise<SharedNoteModel[]> {
    return this.sharedNotesService.notesSharedToMe(user.id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSharedNoteDto: UpdateSharedNoteDto,
  // ) {
  //   return this.sharedNotesService.update(+id, updateSharedNoteDto);
  // }
}
