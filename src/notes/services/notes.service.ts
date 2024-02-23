import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginateService } from 'nestjs-sequelize-paginate';
import { NoteModel } from 'src/databases/models/note.model';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { EmailService } from 'src/email/services/email.service';
import { SharedNotesService } from 'src/shared-notes/services/shared-notes.service';
import { UsersService } from 'src/users/services/users.service';
@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
    private sharedNotesService: SharedNotesService,
    private usersService: UsersService,
    private emailService: EmailService,
    private paginateService: PaginateService,
  ) {}

  public create(
    createNote: Pick<NoteModel, 'title' | 'description' | 'hidden'>,
    user: number | UserModel,
  ): Promise<NoteModel> {
    const title: string = createNote.title;
    const description: string = createNote.description;
    const user_id: number = typeof user === 'number' ? user : user.id;
    const hidden: boolean = createNote.hidden;
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
    const user_id: number = typeof user === 'number' ? user : user.id;
    return this.noteModel
      .scope(['withUser'])
      .findAll({ where: { user_id: user_id } });
  }

  public async getMyNotes(
    page: number = 1,
    user: number | UserModel,
  ): Promise<NoteModel[]> {
    const user_id: number = typeof user === 'number' ? user : user.id;
    console.log('Page in Service ', page);
    const offset = (page - 1) * 2;
    console.log('Offset', offset);
    return this.noteModel.scope(['withUser']).findAll({
      include: [{ model: SharedNoteModel }],
      offset,
      limit: 5,
      where: {
        user_id: user_id,
      },
      // raw: true,
    });
  }

  public async totalNumberNotes(user: number | UserModel) {
    const user_id: number = typeof user === 'number' ? user : user.id;
    const notes = await this.noteModel.findAll({
      where: {
        user_id: user_id,
      },
    });
    return notes.length;
  }

  public async showMyReceivedNotes(
    note: Pick<NoteModel, 'user_id'>,
  ): Promise<NoteModel[]> {
    return this.noteModel.findAll({
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
      // raw: true,
    });
  }

  public findOrFail(id: number): Promise<NoteModel> {
    return this.noteModel.findByPk(id, { rejectOnEmpty: true });
  }

  public findOne(id: number): Promise<NoteModel> {
    return this.noteModel.findByPk(id);
  }

  public update(
    note: NoteModel,
    updateNote: Pick<NoteModel, 'title' | 'description'>,
  ) {
    return note.set(updateNote).save();
  }

  public async remove(note: NoteModel): Promise<null> {
    const sharedNotes: SharedNoteModel[] = await note.$get('sharedNotes');
    const sharedWithUserEmails = Promise.all(
      sharedNotes.map(
        async (sharedNote) =>
          (await this.usersService.findOne(sharedNote.shared_with)).email,
      ),
    );

    console.log('sharedNotess', sharedNotes);
    console.log('sharedWithUserEmails', await sharedWithUserEmails);
    if ((await sharedWithUserEmails).length) {
      await this.emailService.sendEmail(
        note.title,
        note.description,
        await sharedWithUserEmails,
      );
    }
    return note.destroy().then(() => null);
  }

  public async deleteNote(
    user: number | UserModel,
    id: number,
  ): Promise<number> {
    const user_id: number = typeof user === 'number' ? user : user.id;

    const sharedUser: number = await this.noteModel
      .scope(['WithSharedUser'])
      .destroy({
        where: {
          user_id: user_id,
          id: id,
        },
      });
    return sharedUser;
  }
}
