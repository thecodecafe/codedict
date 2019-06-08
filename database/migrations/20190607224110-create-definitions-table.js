'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('definitions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    term_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    creator_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    editor_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'simple',
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    suggested_body: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    edit_commments: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  })
    .then(() => queryInterface.addConstraint('definitions', ['creator_id'], {
      type: 'foreign key',
      name: 'definitions_creator_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    }))
    .then(() => queryInterface.addConstraint('definitions', ['editor_id'], {
      type: 'foreign key',
      name: 'definitions_editor_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    }))
    .then(() => queryInterface.addConstraint('definitions', ['term_id'], {
      type: 'foreign key',
      name: 'definitions_term_id_fkey',
      references: {
        table: 'terms',
        field: 'id',
      },
      onDelete: 'CASCADE',
    })),

  down: (queryInterface) => queryInterface.dropTable('definitions'),
};
