import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SharedNotesService } from '../services/shared-notes.service';
import { CreateSharedNoteDto } from '../dtos/create-shared-note.dto';
// import { UpdateSharedNoteDto } from '../dtos/update-shared-note.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

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
  findAll() {
    return this.sharedNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedNotesService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSharedNoteDto: UpdateSharedNoteDto,
  // ) {
  //   return this.sharedNotesService.update(+id, updateSharedNoteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedNotesService.remove(+id);
  }
}
