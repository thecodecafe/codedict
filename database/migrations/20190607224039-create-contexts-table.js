'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('contexts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    creator_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
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
    .then(() => queryInterface.addConstraint('contexts', ['creator_id'], {
      type: 'foreign key',
      name: 'contexts_creator_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    })),

  down: (queryInterface) => queryInterface.dropTable('contexts'),
};
