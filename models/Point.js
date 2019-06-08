const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');

// Create Point model class
class Point extends Model {}

// Initialize Point model
Point.init({
  user_id: { 
    type: Sql.INTEGER,
    references: { model: User, key: 'id', },
  },
  amount: { 
    type: Sql.INTEGER, 
    allowNull: false
  },
  reason: { 
    type: Sql.STRING,
    allowNull: false
  },
  pointable: { 
    type: Sql.STRING,
    allowNull: true
  },
  pointable_id: { 
    type: Sql.INTEGER,
    allowNull: true
  },
}, {
  underscored: true,
  tableName: 'points',
  modelName: 'point',
  sequelize
});

// Set relationships
Point.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'CASCADE'
});

// Export Point model
module.exports = Point;