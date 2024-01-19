import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { NoteModel } from 'src/databases/models/note.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { MapToNotesPipe } from '../pipes/map-to-notes.pipe';

// @UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  public create(
    @AuthUser() user: number,
    @Body() createNote: CreateNoteDto,
  ): Promise<NoteModel> {
    console.log(user);
    return this.notesService.create(createNote, user);
  }

  @Get()
  public findAll(): Promise<NoteModel[]> {
    console.log("get")
    return this.notesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNote: NoteModel) {
  //   return this.notesService.update(+id, updateNote);
  // }

  @Delete(':id')
  public remove(@Param('id', MapToNotesPipe) id: string) {
    return this.notesService.remove(+id);
  }
}
