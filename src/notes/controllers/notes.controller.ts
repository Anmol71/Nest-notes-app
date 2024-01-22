import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { NoteModel } from 'src/databases/models/note.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  public create(
    @AuthUser() user: number,
    @Body() createNote: CreateNoteDto,
  ): Promise<NoteModel> {
    return this.notesService.create(createNote, user);
  }
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  public findAll(): Promise<NoteModel[]> {
    console.log('get');
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
  public remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
