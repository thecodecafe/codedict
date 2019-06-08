const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

/**
 * Reminder model.
 * @var class
 */
class Reminder extends Model {}

/**
 * Initialize Reminder model
 * @var object
 */
Reminder.init({
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
  expires_at: { 
    type: Sql.DATE,
    allowNull: true
  },
}, {
  underscored: true,
  tableName: 'reminders',
  sequelize
});

// User association
Reminder.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user'
});

// Export Reminder model
module.exports = Reminder;