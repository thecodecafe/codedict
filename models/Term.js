const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const { 
  SIMPLE_DEFINITION, 
  TECHNICAL_DEFINITION
} = require('../configs/const');
const User = require('./User');
const Revision = require('./Revision');
const Definition = require('./Definition');

// Create Term model class
class Term extends Model {}

// Initialize Term model
Term.init({
  title: { 
    type: Sql.STRING
  },
  context: { 
    type: Sql.STRING
  },
  creator_id: { 
    type: Sql.INTEGER,
    allowNull: null
  }
}, {
  underscored: true,
  tableName: 'terms',
  modelName: 'term',
  sequelize
});

// technical definition relationship
Definition.hasOne(Definition, {
  foreignKey: 'term_id',
  scope: {
    kind: TECHNICAL_DEFINITION
  },
  as: 'technicalDefinition'
});

// simple definition relationship
Definition.hasOne(Definition, {
  foreignKey: 'term_id',
  scope: {
    kind: SIMPLE_DEFINITION
  },
  as: 'simpleDefinition'
});

// set vote relationship
Definition.hasMany(Revision, {
  foreignKey: 'revisable_id',
  scope: {
    revisible: 'definition'
  },
});

// set vote relationship
Definition.hasMany(Vote, {
  foreignKey: 'voted_id',
  scope: {
    votable: 'definition',
    kind: 0
  },
  as: 'downVotes'
});

// set vote relationship
Definition.hasMany(Vote, {
  foreignKey: 'voted_id',
  scope: {
    votable: 'definition',
    kind: 1
  },
  as: 'upVotes'
});

// set vote relationship
Definition.hasMany(Vote, {
  foreignKey: 'voted_id',
  scope: { votable: 'definition' },
  as: 'votes'
});

// set term relationship
Term.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL',
    as: 'author'
})

// Export Term model
module.exports = Term;