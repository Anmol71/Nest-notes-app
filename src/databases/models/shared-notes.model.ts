import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { NoteModel } from './note.model';

@Table({ tableName: 'shared_notes' })
export class SharedNoteModel extends Model {
  @ForeignKey(() => UserModel)
  @Column
  public shared_with: number;

  @ForeignKey(() => UserModel)
  @Column
  public shared_from: number;

  @ForeignKey(() => NoteModel)
  @Column
  public note_id: number;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt?: Date;

  // @HasMany(() => UserModel, 'shared_with')
  // public shared_with_users: UserModel[];

  // @BelongsTo(() => UserModel, 'shared_from')
  // public shared_from_user: UserModel;
}
