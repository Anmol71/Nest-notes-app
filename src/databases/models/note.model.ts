import {
  AutoIncrement,
  BelongsTo,
  Column,
  DefaultScope,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { SharedNoteModel } from './shared-notes.model';

@DefaultScope(() => ({
  include: [UserModel],
}))
@Scopes(() => ({
  withUser: {
    include: UserModel,
  },
  // onlyUsersNotes: (user: UserModel) => ({
  //   where: {
  //     user_id: user.id,
  //   },
  // }),
  WithNote: {
    include: NoteModel,
  },
  WithSharedUser: {
    include: [{ model: SharedNoteModel }],
  },
  hidden: {
    where: {
      hidden: false,
    },
  },
}))
@Table({ tableName: 'notes' })
export class NoteModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id: number;

  @ForeignKey(() => UserModel)
  @Column
  public user_id: number;

  @Column
  public title: string;

  @Column
  public description: string;

  @Column
  public hidden: boolean;

  @Column
  public createdAt: Date;

  @Column
  updatedAt?: Date;

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @HasMany(() => SharedNoteModel)
  public sharedNotes: SharedNoteModel[];
}
