import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class MapToNotesPipe implements PipeTransform {
  constructor(private notesService: NotesService) {}

  transform(): Promise<NoteModel[]> {
    const notes: Promise<NoteModel[]> = this.notesService.findAll();
    if (!notes) {
      throw new NotFoundException();
    }
    return notes;
  }
}
