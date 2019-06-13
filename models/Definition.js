'use strict';
const { DataTypes } = require('sequelize');
const {
  SIMPLE_DEFINITION,
  TECHNICAL_DEFINITION
} = require('../configs/const');
const PolymorphicGenerator = require('../utils/PolymorphicGenerator');

/**
 * Model properties.
 */
const Props = {
  term_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  editor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: SIMPLE_DEFINITION,
    validate: { isIn: [SIMPLE_DEFINITION, TECHNICAL_DEFINITION] }
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  edit_comment: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
};

/**
 * Creates defintion term association.
 * @param {Object} Model
 * @param {Object} Term
 */
const TermAssociation = (Model, Term) => Model.belongsTo(
  Term,
  {
    foreignKey: 'term_id',
    as: 'term'
  }
);

/**
 * Creates defintion creator association.
 * @param {Object} Model
 * @param {Object} User
 */
const CreatorAssociation = (Model, User) => Model.belongsTo(
  User,
  {
    foreignKey: 'creator_id',
    as: 'creator'
  }
);

/**
 * Creates defintion editor association.
 * @param {Object} Model
 * @param {Object} User
 */
const EditorAssociation = (Model, User) => Model.belongsTo(
  User,
  {
    foreignKey: 'editor_id',
    as: 'editor'
  }
);

/**
 * Creates defintion reactions association.
 * @param {Object} Model
 * @param {Object} Reaction
 */
const ReactionsAssociation = (Model, Reaction) => Model.hasMany(
  Reaction,
  PolymorphicGenerator('reactable', 'definition', 'reactions')
);

/**
 * Definition Model
 * @param {Object} Sequelize
 * @returns Object
 */
module.exports = Sequelize => {
  // Defone model
  const Definition = Sequelize.define(
    'Definition',
    Props,
    {underscored: true, tableName: 'definitions'}
  );

  // Define associations
  Definition.associate = ({ User, Reaction, Term }) => {
    // Call association creators
    TermAssociation(Definition, Term);
    CreatorAssociation(Definition, User);
    ReactionsAssociation(Definition, Reaction);
    EditorAssociation(Definition, User);
  };

  // Return model
  return Definition;
};