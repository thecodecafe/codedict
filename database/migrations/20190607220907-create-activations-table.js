'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('activations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    activated_at: {
      type: Sequelize.DATE,
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
    .then(() => queryInterface.addConstraint('activations', ['user_id'], {
      type: 'foreign key',
      name: 'activations_user_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    })),

  down: (queryInterface) => queryInterface.dropTable('activations'),
};
