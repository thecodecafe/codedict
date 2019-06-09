'use strict';
// get dependencies
const { SIMPLE_DEFINITION, TECHNICAL_DEFINITION } = require('../configs/const');

/**
 * Definition Model
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Defone model
  const Definition = Sequelize.define('Definition', {
    term_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    editor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: SIMPLE_DEFINITION,
      validate: {
        isIn: [SIMPLE_DEFINITION, TECHNICAL_DEFINITION]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    edit_commment: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  }, {
      underscored: true,
      tableName: 'definitions',
    });

  // Define associations
  Definition.associate = ({ User, Reaction, Term }) => {
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

  }

  // Return model
  return Definition
};