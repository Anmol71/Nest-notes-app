import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'notes' })
export class NoteModel extends Model {
  @PrimaryKey
  @NotNull
  @Column({ allowNull: false })
  public id: number;

  @Column
  @NotNull
  @ForeignKey(() => UserModel)
  public user_id: number;

  @Column
  @NotNull
  public title: string;

  @Column
  @NotNull
  public description: Text;

  @Column
  @NotNull
  public hidden: boolean;

  @Column
  @NotNull
  public createdAt: Date;

  @Column
  @NotNull
  updatedAt?: Date;

  @BelongsTo(() => UserModel)
  public user: UserModel;
}
