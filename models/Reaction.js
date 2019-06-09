'use strict';
// get dependencies
const { REACTION_TYPES } = require('../configs/const');

/**
 * Reaction Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Define model
  const Reaction = Sequelize.define('Reaction',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unknown',
        validate: {
          isIn: REACTION_TYPES
        },
      },
      reactable_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reactable_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reactor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      underscored: true,
      tableName: 'reactions',
    }
  );

  // Define associations
  Reaction.associate = ({ User, Term, Definition }) => {
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
  }

  // Return model
  return Reaction;
};