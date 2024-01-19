import { Injectable, PipeTransform } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class MapToNotesPipe implements PipeTransform {
  constructor(private noteService: NotesService) {}

  public async transform(id: string): Promise<NoteModel> {
    return this.noteService.find(Number(id));
  }
}
