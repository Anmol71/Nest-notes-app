import { Model, Table } from 'sequelize-typescript';

@Table
export class SharedNoteModel extends Model {
  id: number;
}
