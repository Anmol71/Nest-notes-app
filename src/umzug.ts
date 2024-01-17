import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('notes_project', 'blazeanmol', 'Rubi@123', {
  dialect: 'mysql',
  storage: './db.sql',
});

export const migrator = new Umzug({
  migrations: {
    glob: 'src/databases/migrations/*.ts',
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

console.log(process.cwd());
export type Migration = typeof migrator._types.migration;
