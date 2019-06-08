const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');
const Vote = require('./Vote');
const Revision = require('./Revision');
const Term = require('./Term');
const { 
  SIMPLE_DEFINITION, 
  TECHNICAL_DEFINITION
} = require('../configs/const');

// Create Definition model class
class Definition extends Model { }

// Initialize Definition model
Definition.init({
  body: {
    type: Sql.TEXT
  },
  kind: {
    type: Sql.INTEGER,
    validate: { isIn: [
      SIMPLE_DEFINITION, 
      TECHNICAL_DEFINITION
    ] }
  },
  user_id: {
    type: Sql.INTEGER,
    allowNull: true
  }
}, {
    underscored: true,
    tableName: 'definitions',
    modelName: 'definition',
    sequelize
  });

// Set vote relationship
Definition.belongsTo(Term, {
  foreignKey: 'term_id',
});

// Set vote relationship
Definition.hasMany(Revision, {
  foreignKey: 'revisable_id',
  scope: {
    revisible: 'definition'
  },
});

// Set vote relationship
Definition.hasMany(Vote, {
  foreignKey: 'voted_id',
  scope: {
    votable: 'definition',
    kind: 0
  },
  as: 'downVotes'
});

// Set vote relationship
Definition.hasMany(Vote, {
  foreignKey: 'voted_id',
  scope: {
    votable: 'definition',
    kind: 1
  },
  as: 'upVotes'
});

// Set vote relationship
Definition.hasMany(Vote, {
  foreignKey: 'voted_id',
  scope: { votable: 'definition' },
  as: 'votes'
});

// Set user relationship
Definition.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  as: 'author'
})

// Export Definition model
module.exports = Definition;