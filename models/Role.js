'use strict';
const { DataTypes } = require('sequelize');

/**
 * Model properties.
 */
const Props = {
  name: {
    type: DataTypes.STRING
  },
  display_name: {
    type: DataTypes.STRING
  }
};

/**
 * Defines members relationship.
 * @param {Object} Model
 * @param {Object} User
 */
const MembersAssociation = (Model, User) => {
  Model.belongsToMany(User, {
    through: 'RoleUser',
    as: 'users',
    foreignKey: 'role_id',
    otherKey: 'user_id'
  });
};

/**
 * Role Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = Sequelize => {
  const Role = Sequelize.define(
    'Role',
    Props,
    {underscored: true, tableName: 'roles'}
  );

  // Define associations
  Role.associate = ({User}) => MembersAssociation(Role, User);

  // return model
  return Role;
};