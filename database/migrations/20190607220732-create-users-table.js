'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: Sequelize.STRING,
    avatar: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.TEXT,
    provider: {
      type: Sequelize.STRING,
      defaultValue: 'local',
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('users'),
};
