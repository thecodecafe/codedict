const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const Activation = require('./Activation');
const Vote = require('./Vote');
const Activation = require('./Activation');
const Definition = require('./Definition');
const Term = require('./Term');
const Point = require('./Point');

// Create User model class
class User extends Model {}

// Initialize User model
User.init({
  avatar: { 
    type: Sql.TEXT, 
    allowNull: true, 
    defaultValue: null 
  },
  name: { 
    type: Sql.STRING,
  },
  email: { 
    type: Sql.STRING, 
    unique: true,
    validate: {isEmail: true}
  },
  password: { 
    type: Sql.STRING
  },
  provider: { 
    type: Sql.STRING
  }, // local or github
}, {
  underscored: true,
  tableName: 'users',
  modelName: 'user',
  sequelize
});

// Set user relationship with votes
User.hasMany(Vote, { 
  foreignKey: 'voter_id'
});

// Set user relationship with votes
User.hasOne(Activation, { 
  foreignKey: 'user_id'
});

// Set definition relationships
User.hasMany(Definition, { 
  foreignKey: 'user_id'
});
    
// Set terms relationships
User.hasMany(Term, { 
  foreignKey: 'user_id'
});

// Set points relationships
User.hasMany(Point, { 
  foreignKey: 'user_id'
});
      
// Export User model
module.exports = User;