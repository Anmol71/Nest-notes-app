import { Injectable } from '@nestjs/common';
import { NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class NotesService {
  create(createNote: NoteModel) {
    return 'This action adds a new note';
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNote: NoteModel) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
