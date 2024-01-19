import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteModel } from 'src/databases/models/note.model';
import { UserModel } from 'src/databases/models/user.model';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
  ) {}

  public create(
    createNote: Pick<NoteModel, 'title' | 'description' | 'hidden'>,
    user: number | UserModel,
  ): Promise<NoteModel> {
    const title = createNote.title;
    const description = createNote.description;
    const user_id = typeof user === 'number' ? user : user.id;
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

  public findAll(): Promise<NoteModel[]> {
    return this.noteModel.scope(['withUser']).findAll();
  }

  // public findUserId(createNote: Pick<NoteModel, 'user_id'>) {
  //   const user_id = createNote.user_id;
  //   return this.noteModel.findOne({ where: { user_id: user_id } });
  // }

  public find(id: number): Promise<NoteModel> {
    return this.noteModel.findByPk(id, { rejectOnEmpty: true });
  }

  // update(id: number, updateNote: NoteModel) {
  //   return `This action updates a #${id} note`;
  // }

  public remove(id: number): Promise<null> {
    return this.noteModel.destroy({ where: { id: id } }).then(() => null);
  }
}
