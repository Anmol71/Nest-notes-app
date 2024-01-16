import {
    BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  NotNull,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { NoteModel } from './note.model';

@Table({ tableName: 'shared_notes' })
export class SharedNoteModel extends Model {
  @Column
  @NotNull
  @ForeignKey(() => UserModel)
  public shared_with: number;

  @Column
  @NotNull
  @ForeignKey(() => UserModel)
  public shared_from: number;

  @Column
  @NotNull
  @ForeignKey(() => NoteModel)
  public notes_id: number;

  @Column
  @NotNull
  public createdAt: Date;

  @Column
  @NotNull
  public updatedAt?: Date;

  @HasMany(()=> UserModel,'id')
  
}
