'use strict';
const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

/**
 * Context model.
 * @var class
 */
class Context extends Model {};

/**
 * Initialise Context Model.
 * @var object
 */
Context.init({
  name: {
    type: Sql.STRING,
    allowNull: false,
    unique: true,
  },
  creator_id: {
    type: Sql.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  underscored: true,
  tableName: 'contexts',
  sequelize
});

// User association
Context.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator',
  targetKey: 'id'
});

// export model
module.exports = Context;