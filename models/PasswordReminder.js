const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

// Create PasswordReminder model class
class PasswordReminder extends Model {}

// Initialize PasswordReminder model
PasswordReminder.init({
  user_email: { 
    type: Sql.STRING,
    unique: true,
    validate: { isEmail: true }
  },
  code: { 
    type: Sql.TEXT,
    unique: true
  },
  expires_at: {
    type: Sql.DATE
  },
}, {
  underscored: true,
  tableName: 'password_reminders',
  modelName: 'passwordReminder',
  sequelize
});

// Set relationship for user
PasswordReminder.belongsTo(User, {
  targetKey: 'email', 
  foreignKey: 'user_email',
  onDelete: 'CASCADE'
});

// Export PasswordReminder model
module.exports = PasswordReminder;