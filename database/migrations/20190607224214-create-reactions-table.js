'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('reactions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'heart',
    },
    reactable_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    reactable_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reactor_id: {
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
    .then(() => queryInterface.addConstraint('reactions', ['reactor_id'], {
      type: 'foreign key',
      name: 'reactions_reactor_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'SET NULL',
    })),

  down: (queryInterface) => queryInterface.dropTable('reactions'),
};
