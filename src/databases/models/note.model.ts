import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

// @DefaultScope(()=> ({
//   include: UserModel,
// }))
@Scopes(() => ({
  withUser: {
    include: UserModel,
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
}
