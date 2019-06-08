const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

// Create Subscription model class
class Subscription extends Model {}

// Initialize Subscription model
Subscription.init({
  user_id: { 
    type: Sql.INTEGER,
    references: { model: User, key: 'id', },
  },
  code: { 
    type: Sql.TEXT, 
    allowNull: true
  },
  expires_at: { 
    type: Sql.DATE,
    allowNull: true
  },
  activated_at: { 
    type: Sql.DATE,
    allowNull: true,
    defaultValue: null
  },
}, {
  underscored: true,
  tableName: 'subscriptions',
  modelName: 'subscription',
  sequelize
});

// Set relationships
Subscription.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  as: 'subscriber'
});

// Export Subscription model
module.exports = Subscription;