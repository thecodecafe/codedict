const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');
const Definition = require('./Definition');

// Create Vote model class
class Vote extends Model {}

// Initialize Vote model
Vote.init({
  kind: { 
    type: Sql.INTEGER,
    validate: {min: 0, max: 1}
  },
  voted_id: {
    type: Sql.INTEGER,
    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    allowNull: true
  },
  voter_id: { 
    type: Sql.INTEGER,
    deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 'votes',
  modelName: 'vote',
  sequelize
});

// Set relationsip with definition
Vote.belongsTo(Definition, {
  targetKey: 'id', 
  foreignKey: 'voted_id',
  onDelete: 'SET NULL'
});

// Set relationsip with definition
Vote.belongsTo(User, {
  targetKey: 'id', 
  foreignKey: 'voter_id',
  onDelete: 'SET NULL'
});
  
// Export Vote model
module.exports = Vote;