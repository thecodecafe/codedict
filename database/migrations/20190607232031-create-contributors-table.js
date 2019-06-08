'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('contributors', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'like',
    },
    contributable_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    contributable_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    contributor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    subscribed: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    .then(() => queryInterface.addConstraint('contributors', ['contributor_id'], {
      type: 'foreign key',
      name: 'contributors_contributor_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    })),

  down: (queryInterface) => queryInterface.dropTable('contributors'),
};
