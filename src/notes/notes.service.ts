import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
  ) {}
  create(
    createNote: Pick<NoteModel, 'title' | 'description' | 'user_id' | 'hidden'>,
  ) {
    const title = createNote.title;
    const description = createNote.description;
    const user_id = createNote.user_id;
    const hidden = createNote.hidden;
    return this.noteModel
      .build()
      .set({
        title: title,
        description: description,
        user_id: user_id,
        hidden: hidden,
      })
      .save();
  }

  findAll() {
    return this.noteModel.findAll();
  }

  findOne(id: number) {
    return this.noteModel.findOne({ where: { id: id } });
  }

  // update(id: number, updateNote: NoteModel) {
  //   return `This action updates a #${id} note`;
  // }

  remove(id: number) {
    return this.noteModel.destroy({ where: { id: id } });
  }
}
