const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

// Create Reminder model class
class Reminder extends Model {}

// Initialize Reminder model
Reminder.init({
  user_id: { 
    type: Sql.INTEGER,
    references: { 
      model: User, key: 'id',
      allowNull: false
    },
  },
  code: { 
    type: Sql.TEXT, 
    allowNull: true,
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
  tableName: 'activations',
  modelName: 'activation',
  sequelize
});

// Set relationships
Reminder.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE'
});

// Export Reminder model
module.exports = Reminder;