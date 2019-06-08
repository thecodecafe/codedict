'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('points', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pointable_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pointable_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
    .then(() => queryInterface.addConstraint('points', ['user_id'], {
      type: 'foreign key',
      name: 'points_user_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    })),

  down: (queryInterface) => queryInterface.dropTable('points'),
};
