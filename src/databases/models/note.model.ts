import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'notes' })
export class NoteModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
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
