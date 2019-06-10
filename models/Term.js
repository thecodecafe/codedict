'use strict';
// get dependencies
const { SIMPLE_DEFINITION, TECHNICAL_DEFINITION } = require('../configs/const');

/**
 * Term Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Define model
  const Term = Sequelize.define('Term',
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      context_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      edit_comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      editor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      underscored: true,
      tableName: 'terms',
    }
  );

  // Define associations
  Term.associate = ({
    User,
    Context,
    Definition,
    Reaction
  }) => {
    // Technical definition association
    Term.hasOne(Definition, {
      foreignKey: 'term_id',
      scope: {
        type: TECHNICAL_DEFINITION
      },
      as: 'technical'
    });

    // Technical definition association
    Term.hasOne(Definition, {
      foreignKey: 'term_id',
      scope: {
        type: SIMPLE_DEFINITION
      },
      as: 'simple'
    });

    // Reactions association.
    Term.hasMany(Reaction, {
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
  }

  // return model
  return Term;
};