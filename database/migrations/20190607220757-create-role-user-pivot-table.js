'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('role_user', {
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  })
    .then(() => queryInterface.addConstraint('role_user', ['role_id', 'user_id'], {
      type: 'primary key',
      name: 'p_keys',
    }))
    .then(() => queryInterface.addConstraint('role_user', ['role_id'], {
      type: 'foreign key',
      name: 'role_user_role_id_fkey',
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'CASCADE',
    }))
    .then(() => queryInterface.addConstraint('role_user', ['user_id'], {
      type: 'foreign key',
      name: 'role_user_user_id_fkey',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
    })),
  down: (queryInterface) => queryInterface.dropTable('role_user'),
};
