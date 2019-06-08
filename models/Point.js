const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');
const Term = require('./Term');
const Definition = require('./Definition');

// Create Point model class
class Point extends Model {}

// Initialize Point model
Point.init({
  user_id: { 
    type: Sql.INTEGER,
    allowNull: false,
    references: { 
      model: User, 
      key: 'id'
    },
  },
  amount: { 
    type: Sql.INTEGER, 
    allowNull: false
  },
  type: { 
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
  sequelize
});

// User association
Point.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Term association
Point.belongsTo(Term, {
  foreignKey: 'pointable_id',
  scope:{
    pointable_type: 'term'
  },
  as: 'terms'
});

// Definition association
Point.belongsTo(Definition, {
  foreignKey: 'pointable_id',
  scope:{
    pointable_type: 'definition'
  },
  as: 'definition'
});

// Export model.
module.exports = Point;