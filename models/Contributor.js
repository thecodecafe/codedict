'use strict';
const Sql = require('sequelize');
const { Model } = Sql;
const User = require('./User');
const Term = require('./Term');

/**
 * Contributor model.
 * @var class
 */
class Contributor extends Model {}

/**
 * Initialise Contributor model.
 * @var  object
 */
Contributor.init({
  term_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Term,
      key: 'id'
    }
  },
  contributor_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  subscribed: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

// Term association
Contributor.belongsTo(Term, {
  foreignKey: 'term_id',
  as: 'term'
});

// Contributor association
Contributor.belongsTo(User, {
  foreignKey: 'contributor_id',
  as: 'contributor'
});

// Export model
module.exports = Contributor;