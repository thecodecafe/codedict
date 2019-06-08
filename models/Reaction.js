'use strict';
const Sql = require('sequelize');
const { Model } = Sql;
const User = require('./User');
const Term = require('./Term');
const Definition = require('./Definition');
const sequelize = require('../configs/sequelize');

/**
 * Reaction model.
 * @var class
 */
class Reaction extends Model {}

/**
 * Initialise reaction model.
 * @var object
 */
Reaction.init({
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'heart',
  },
  reactable_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reactable_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  reactor_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
}, {
  underscored: true,
  tableName: 'reactions',
  sequelize,
});

// Reactor association
Reaction.belongsTo(User, {
  foreignKey: 'reactor_id',
  as: 'reactor'
});

// Term association
Reaction.belongsTo(Term, {
  foreignKey: 'reactable_id',
  as: 'term',
  scope: {
    reactable_type: 'term'
  }
});

// Definition association
Reaction.belongsTo(Definition, {
  foreignKey: 'reactable_id',
  as: 'definition',
  scope: {
    reactable_type: 'definition'
  }
});

// Export model.
module.exports = Reaction;