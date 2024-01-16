import {
  Column,
  HasMany,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { NoteModel } from './note.model';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @NotNull
  @PrimaryKey
  @Column({ allowNull: false })
  id: number;

  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => NoteModel)
  public notes: NoteModel[];
}
