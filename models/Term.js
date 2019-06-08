const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const { SIMPLE_DEFINITION, TECHNICAL_DEFINITION } = require('../configs/const');
const User = require('./User');
const Context = require('./Context');
const Definition = require('./Definition');
const Reaction = require('./Reaction');

/**
 * Term model.
 * @var class
 */
class Term extends Model { }

/**
 * Initialize Term model
 * @var object
 */
Term.init({
  body: {
    type: Sql.STRING,
    allowNull: false
  },
  context_id: {
    type: Sql.INTEGER,
    allowNull: true,
    references: {
      model: Context,
      key: 'id'
    }
  },
  creator_id: {
    type: Sql.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  edit_comment: {
    type: Sql.STRING,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  editor_id: {
    type: Sql.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
    underscored: true,
    tableName: 'terms',
    sequelize
  });

// Technical definition association
Definition.hasOne(Definition, {
  foreignKey: 'term_id',
  scope: {
    type: TECHNICAL_DEFINITION
  },
  as: 'technical'
});

// Technical definition association
Definition.hasOne(Definition, {
  foreignKey: 'term_id',
  scope: {
    type: SIMPLE_DEFINITION
  },
  as: 'simple'
});

// Reactions association.
Definition.hasMany(Reaction, {
  foreignKey: 'reactable_id',
  scope: { reactable_type: 'term' },
  as: 'reactions'
});

// Creator association.
Term.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator'
});

// Editor association.
Term.belongsTo(User, {
  foreignKey: 'editor_id',
  as: 'editor'
});

// Context association.
Term.belongsTo(Context, {
  foreignKey: 'context_id',
  as: 'context',
});

// Contributors association.
Term.belongsToMany(User, {
  as: 'contributors',
  foreignKey: 'term_id',
  otherKey: 'contributor_id',
  through: 'Contributor',
});

// Export model.
module.exports = Term;