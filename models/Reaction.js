'use strict';
const { DataTypes } = require('sequelize');
const { REACTION_TYPES } = require('../configs/const');

/**
 * Model properties
 */
const Props = {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'unknown',
    validate: {
      isIn: REACTION_TYPES
    }
  },
  reactable_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reactable_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reactor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
};

/**
 * Defines a reactor relationship.
 * @param {Object} Model
 * @param {Object} User
 */
const ReactorAssociation = (Model, User) => {
  Model.belongsTo(User, {
    foreignKey: 'reactor_id',
    as: 'reactor'
  });
};

/**
 * Defines a term relationship.
 * @param {Object} Model
 * @param {Object} Term
 */
const TermAssociation = (Model, Term) => {
  Model.belongsTo(Term, {
    foreignKey: 'reactable_id',
    as: 'term',
    scope: {
      reactable_type: 'term'
    }
  });
};

/**
 * Defines a definition relationship.
 * @param {Object} Model
 * @param {Object} Defintiion
 */
const DefinitionAssociation = (Model, Definition) => {
  Model.belongsTo(Definition, {
    foreignKey: 'reactable_id',
    as: 'term',
    scope: {
      reactable_type: 'term'
    }
  });
};

/**
 * Reaction Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = Sequelize => {
  // Define model
  const Reaction = Sequelize.define(
    'Reaction',
    Props,
    {underscored: true, tableName: 'reactions'}
  );

  // Define associations
  Reaction.associate = ({ User, Term, Definition }) => {
    // Call association creators
    ReactorAssociation(Reaction, User);
    TermAssociation(Reaction, Term);
    DefinitionAssociation(Reaction, Definition);
  };

  // Return model
  return Reaction;
};