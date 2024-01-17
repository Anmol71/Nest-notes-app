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

  @HasMany(() => NoteModel)
  public notes: NoteModel[];
}
