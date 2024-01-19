import { DataTypes } from 'sequelize';
import type { Migration } from '../../umzug';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('shared_notes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    shared_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shared_with: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
      allowNull: false,
    },
  });
  await sequelize.getQueryInterface().addConstraint('shared_notes', {
    fields: ['note_id'],
    type: 'foreign key',
    name: 'notes_shared_notes_fkey',
    references: {
      table: 'notes',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'no action',
  });
  await sequelize.getQueryInterface().addConstraint('shared_notes', {
    fields: ['shared_from'],
    type: 'foreign key',
    // name: 'users_shared_notes_fkey',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'no action',
  });
  await sequelize.getQueryInterface().addConstraint('shared_notes', {
    fields: ['shared_with'],
    type: 'foreign key',
    // name: 'users_shared_notes_fkey',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'no action',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('shared_notes');
};
