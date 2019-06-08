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
Activation.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE'
});

// Export Activation model
module.exports = Activation;