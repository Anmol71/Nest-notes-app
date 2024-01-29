import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteModel } from 'src/databases/models/note.model';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { SharedNotesService } from 'src/shared-notes/services/shared-notes.service';
@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
    private sharedNotesService: SharedNotesService,
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

  public findAllByUser(user: number | UserModel): Promise<NoteModel[]> {
    const user_id = typeof user === 'number' ? user : user.id;
    return this.noteModel
      .scope(['withUser'])
      .findAll({ where: { user_id: user_id } });
  }

  public getMyNotes(user: number | UserModel) {
    const user_id = typeof user === 'number' ? user : user.id;
    console.log('User Id ', user_id);
    return this.noteModel.scope(['withUser']).findAll({
      include: [{ model: SharedNoteModel }],
      where: {
        user_id: user_id,
      },
      raw: true,
    });
  }

  public async showMyReceivedNotes(note: Pick<NoteModel, 'user_id'>) {
    console.log(note, 'lol');

    const data = await this.noteModel.findAll({
      where: { shared_from: note.user_id },
      attributes: ['shared_note_id'],
      include: [
        { model: UserModel, attributes: ['name'], as: 'sender' },
        {
          model: NoteModel,
          attributes: ['title', 'content'],
          as: 'notes',
        },
      ],
      raw: true,
    });

    const noteWithUsername = data.map((note) => {
      const noteObject = Object.assign({}, note);
      const username = noteObject['sender.name'];
      const title = noteObject['notes.title'];
      const content = noteObject['notes.content'];
      const data = { username, title, content };
      return data;
    });

    return noteWithUsername;
  }

  // public findUserId(createNote: Pick<NoteModel, 'user_id'>) {
  //   const user_id = createNote.user_id;
  //   return this.noteModel.findOne({ where: { user_id: user_id } });
  // }

  public findOrFail(id: number): Promise<NoteModel> {
    return this.noteModel.findByPk(id, { rejectOnEmpty: true });
  }

  public findOne(id: number) {
    return this.noteModel.findByPk(id);
  }

  public update(
    note: NoteModel,
    updateNote: Pick<NoteModel, 'title' | 'description'>,
  ) {
    return note.set(updateNote).save();
  }

  public remove(note: NoteModel): Promise<void> {
    return note.destroy();
  }

  public async deleteNote(
    user: number | UserModel,
    id: number,
  ): Promise<number> {
    const user_id = typeof user === 'number' ? user : user.id;
    return this.noteModel.destroy({
      where: {
        user_id: user_id,
        id: id,
      },
    });
  }

  // public sharedWithSingleUser(note: NoteModel , user: number | UserModel,){
  //   const note_id = note.id;
  //   const user_id = typeof user === 'number' ? user: user.id;
  //   return this..build().set({
  //   })
  // }
}
