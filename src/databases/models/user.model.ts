import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { NoteModel } from './note.model';
import { SharedNoteModel } from './shared-notes.model';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @Unique
  @Column
  email: string;

  @HasMany(() => NoteModel)
  public notes: NoteModel[];

  @HasMany(() => SharedNoteModel)
  public sharedNotes: SharedNoteModel[];
}
