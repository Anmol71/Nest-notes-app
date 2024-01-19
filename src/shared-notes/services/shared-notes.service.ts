import { Injectable } from '@nestjs/common';
// import { UpdateSharedNoteDto } from '../dtos/update-shared-note.dto';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SharedNotesService {
  constructor(
    @InjectModel(SharedNoteModel)
    private sharedNoteModel: typeof SharedNoteModel,
  ) {}
  create(
    createSharedNote: Pick<SharedNoteModel, 'shared_with' | 'note_id'>,
    user: number | UserModel,
  ) {
    const shared_with = createSharedNote.shared_with;
    const note_id = createSharedNote.note_id;
    const user_id = typeof user === 'number' ? user : user.id;
    return this.sharedNoteModel
      .build()
      .set({
        shared_with: shared_with,
        note_id: note_id,
        shared_from: user_id,
      })
      .save();
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
