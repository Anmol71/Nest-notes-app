import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class MapToNotesPipe implements PipeTransform {
  constructor(private notesService: NotesService) {}

  public async transform(id: number): Promise<NoteModel> {
    console.log('Map to notes pipe');
    const note: NoteModel = await this.notesService.findOne(id);
    if (!note) {
      throw new NotFoundException();
    }
    return note;
  }
}
