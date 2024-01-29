import type { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('users', {});
};
export const down: Migration = async ({ context: sequelize }) => {};
