const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const Role = require('./Role');
const Activation = require('./Activation');
const Reminder = require('./Reminder');
const Reaction = require('./Reaction');
const Definition = require('./Definition');
const Term = require('./Term');
const Point = require('./Point');
const Context = require('./Context');

/**
 * User model.
 * @var class
 */
class User extends Model {}

/**
 * Initialise User model.
 * @var object
 */
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
  sequelize
});

// Roles association
User.belongsToMany(Role, {
  as: 'roles',
  through: 'RoleUser',
  foreignKey: 'user_id',
  otherKey: 'role_id'
});

// Contexts association
User.hasMany(Context, {
  as: 'contexts',
  foreignKey: 'creator_id',
});

// Contributions association
User.belongsToMany(Term, {
  as: 'contributions',
  through: 'Contributor',
  foreignKey: 'contributor_id',
  otherKey: 'term_id',
});

// Created Definitions association
User.hasMany(Definition, {
  as: 'createdDefinitions',
  foreignKey: 'creator_id',
});

// Edited Definitions association
User.hasMany(Definition, {
  as: 'editedDefinitions',
  foreignKey: 'editor_id',
});

// Created Terms association
User.hasMany(Term, {
  as: 'createdTerms',
  foreignKey: 'creator_id',
});

// Edited Terms association
User.hasMany(Term, {
  as: 'editedTerms',
  foreignKey: 'editor_id',
});

// Point association
User.hasMany(Point, {
  as: 'points',
  foreignKey: 'user_id',
});

// Reaction association
User.hasMany(Reaction, {
  as: 'reactions',
  foreignKey: 'reactor_id',
});

// Reminder association
User.hasOne(Reminder, {
  as: 'reminders',
  foreignKey: 'user_id',
});

// Activation association
User.hasOne(Activation, {
  as: 'activations',
  foreignKey: 'user_id',
});
      
// Export User model
module.exports = User;