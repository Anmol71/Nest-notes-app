import { Injectable } from '@nestjs/common';
// import { UpdateSharedNoteDto } from '../dtos/update-shared-note.dto';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class SharedNotesService {
  constructor(
    @InjectModel(SharedNoteModel)
    private sharedNoteModel: typeof SharedNoteModel,
  ) {}
  create(
    createSharedNote: Pick<SharedNoteModel, 'shared_with'>,
    user: number | UserModel,
    note: NoteModel,
  ) {
    const shared_with = createSharedNote.shared_with;
    const user_id = typeof user === 'number' ? user : user.id;
    console.log('Enter Create .....');
    console.log({
      shared_from: user_id,
      shared_with: shared_with,
      note_id: note.id,
    });
    return this.sharedNoteModel
      .build()
      .set({
        shared_from: user_id,
        shared_with: shared_with,
        note_id: note.id,
      })
      .save();
  }
  // public async sharingNote(
  //   data: Pick<SharedNoteModel, 'note_id' | 'shared_with'>,
  //   user_id: number,
  // ): Promise<SharedNoteModel | string> {
  //   return this.sharedNoteModel.build().set(data).save();
  // }
  public async notesSharedToMe(user_id: number) {
    return this.sharedNoteModel.scope('WithNoteUser').findAll({
      // attributes: ['note.title', 'note.description', 'note.id'],
      where: {
        shared_with: user_id,
      },
      include: [{ model: UserModel, attributes: ['username'], as: 'sender' }],
    });
  }

  public async getSharedToUserId(note_id: number): Promise<SharedNoteModel> {
    return this.sharedNoteModel.findOne({
      where: {
        note_id: note_id,
      },
    });
  }

  findAll() {
    return `This action returns all sharedNotes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedNote`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateSharedNoteDto: SharedNoteModel) {
    return `This action updates a #${id} sharedNote`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedNote`;
  }
}
