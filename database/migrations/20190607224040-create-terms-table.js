'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('terms', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    context_id: {
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
      defaultValue: null
    },
    body: {
      type: Sequelize.STRING,
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
    .then(() => queryInterface.addConstraint('terms', ['creator_id'], {
      type: 'foreign key',
      name: 'terms_creator_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    }))
    .then(() => queryInterface.addConstraint('terms', ['editor_id'], {
      type: 'foreign key',
      name: 'terms_editor_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    }))
    .then(() => queryInterface.addConstraint('terms', ['context_id'], {
      type: 'foreign key',
      name: 'terms_context_id_fkey',
      references: {
        table: 'contexts',
        field: 'id',
      },
      onDelete: 'SET NULL',
    })),

  down: (queryInterface) => queryInterface.dropTable('terms'),
};
