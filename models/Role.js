'use strict';
/**
 * Role Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  const Role = Sequelize.define('Role',
    {
      name: {
        type: DataTypes.STRING
      },
      display_name: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true,
      tableName: 'roles'
    }
  );

  // Define associations
  Role.associate = ({User}) => {
    // User association.
    Role.belongsToMany(User, {
      through: 'RoleUser',
      as: 'users',
      foreignKey: 'role_id',
      otherKey: 'user_id'
    });
  };

  // return model
  return Role;
};