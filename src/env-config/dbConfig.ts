export const dbConfig = () => {
  const db = { databases: {} };
  db.databases['default'] = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    logging: console.log,
    name: 'default',
  } as IDBConfig;
  return db;
};

export interface IDBConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
