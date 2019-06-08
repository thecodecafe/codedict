const Sql = require('sequelize');
const { Model } = Sql;
const sequelize = require('../configs/sequelize');
const User = require('./User');
const Reaction = require('./Reaction');
const Term = require('./Term');
const { SIMPLE_DEFINITION, TECHNICAL_DEFINITION } = require('../configs/const');

// Create Definition model class
class Definition extends Model { }

// Initialize Definition model
Definition.init({
  term_id: {
    type: Sql.INTEGER,
    allowNull: false,
    references: {
      model: Term,
      key: 'id'
    }
  },
  creator_id: {
    type: Sql.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: User,
      key: 'id'
    }
  },
  editor_id: {
    type: Sql.INTEGER,
    allowNull: true,
    defaultValue: null,
    references: {
      model: User,
      key: 'id'
    }
  },
  type: {
    type: Sql.INTEGER,
    allowNull: false,
    defaultValue: SIMPLE_DEFINITION,
    validate: {
      isIn: [SIMPLE_DEFINITION, TECHNICAL_DEFINITION]
    }
  },
  body: {
    type: Sql.TEXT,
    allowNull: false
  },
  edit_commment: {
    type: Sql.STRING,
    allowNull: true,
    defaultValue: null,
  },
}, {
    underscored: true,
    tableName: 'definitions',
    sequelize
  });

// Term association.
Definition.belongsTo(Term, {
  foreignKey: 'term_id',
  as: 'term'
});

// Reactions association.
Definition.hasMany(Reaction, {
  foreignKey: 'reactable_id',
  scope: {
    reactable_type: 'definition',
  },
  as: 'reactions'
});

// Creator association.
Definition.belongsTo(User, {
  foreignKey: 'creator_id',
  as: 'creator'
});

// Editor association.
Definition.belongsTo(User, {
  foreignKey: 'editor_id',
  as: 'editor'
});


// Export Definition model
module.exports = Definition;