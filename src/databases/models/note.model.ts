import { Model, Table } from 'sequelize-typescript';

@Table
export class NoteModel extends Model {
  id: number;
}
