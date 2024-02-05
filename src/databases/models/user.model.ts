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
  public id: number;

  @Unique
  @Column
  public username: string;

  @Column
  public password: string;

  @Unique
  @Column
  public email: string;

  @Column
  public filename: string;

  @HasMany(() => NoteModel)
  public notes: NoteModel[];

  @HasMany(() => SharedNoteModel)
  public sharedNotes: SharedNoteModel[];
}
