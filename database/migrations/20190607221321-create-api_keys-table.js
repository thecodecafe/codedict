'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('api_keys', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    key: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    },
    domains: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '*',
    },
    blacklisted_at: {
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
  }),

  down: (queryInterface) => queryInterface.dropTable('api_keys'),
};
