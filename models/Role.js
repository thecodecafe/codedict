'use strict';
const Sql = require('sequelize'); 
const {Model} = Sql;
const User = require('./User');
const sequelize = require('../configs/sequelize');

/**
 * Roles model.
 * @var class
 */
class Role extends Model {};

/**
 * Initialize model.
 * @var object
 */
Role.init({
  name: {
    type: Sql.STRING
  },
  display_name: {
    type: Sql.STRING
  }
}, {
  underscored: true,
  tableName: 'roles',
  sequelize
});

// User association.
Role.belongsToMany(User, { 
  through: 'RoleUser',
  as: 'users',
  foreignKey: 'role_id',
  otherKey: 'user_id'
});

// export model as module.
module.exports = Role;