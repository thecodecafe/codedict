'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('contributors', {
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
    }))
    .then(() => queryInterface.addConstraint('contributors', ['term_id'], {
      type: 'foreign key',
      name: 'contributors_term_id_fkey',
      references: {
        table: 'terms',
        field: 'id',
      },
      onDelete: 'SET NULL',
    })),

  down: (queryInterface) => queryInterface.dropTable('contributors'),
};
