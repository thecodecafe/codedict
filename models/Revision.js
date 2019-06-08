const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

// Create Revision model class
class Revision extends Model {}

// Initialize Revision model
Revision.init({
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
  tableName: 'revisions',
  modelName: 'revision',
  sequelize
});

// Set relationships
Revision.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE',
  as: 'author'
});

// Export Revision model
module.exports = Revision;