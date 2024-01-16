import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteModel } from 'src/databases/models/note.model';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNote: NoteModel) {
    return this.notesService.create(createNote);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNote: NoteModel) {
    return this.notesService.update(+id, updateNote);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
