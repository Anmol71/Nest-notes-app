import {
  Column,
  Model,
  NotNull,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
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
}
