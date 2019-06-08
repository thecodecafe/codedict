'use strict';
const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

// Create Activation model class
class Activation extends Model {}

// Initialize Activation model
Activation.init({
  user_id: { 
    type: Sql.INTEGER,
    allowNull: false,
    references: { 
      model: User,
      key: 'id',
    },
  },
  code: { 
    type: Sql.TEXT, 
    allowNull: true,
  },
  activated_at: { 
    type: Sql.DATE,
    allowNull: true,
    defaultValue: null
  },
}, {
  underscored: true,
  tableName: 'activations',
  sequelize
});

// User Association
Activation.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user'
});

// Export Activation model
module.exports = Activation;