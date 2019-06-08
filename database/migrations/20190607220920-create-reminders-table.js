'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('reminders', {
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
      allowNull: false,
      unique: true,
    },
    expires_at: {
      type: Sequelize.DATE,
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
    .then(() => queryInterface.addConstraint('reminders', ['user_id'], {
      type: 'foreign key',
      name: 'reminders_user_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    })),

  down: (queryInterface) => queryInterface.dropTable('reminders'),
};
