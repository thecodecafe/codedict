'use strict';
const { DataTypes } = require('sequelize');
const { SIMPLE_DEFINITION, TECHNICAL_DEFINITION } = require('../configs/const');

/**
 * Model properties.
 */
const Props = {
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  context_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  edit_comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
  editor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
};

/**
 * Defines technical definition relationship.
 * @param {Object} Model
 * @param {Object} Definition
 */
const TechnicalDefinitionAssociation = (Model, Definition) => {
  Model.hasOne(Definition, {
    foreignKey: 'term_id',
    scope: {
      type: TECHNICAL_DEFINITION
    },
    as: 'technical'
  });
};

/**
 * Defines simple definition relationship.
 * @param {Object} Model
 * @param {Object} Definition
 */
const SimpleDefinitionAssociation = (Model, Definition) => {
  Model.hasOne(Definition, {
    foreignKey: 'term_id',
    scope: {
      type: SIMPLE_DEFINITION
    },
    as: 'simple'
  });
};

/**
 * Defines reactions relationship.
 * @param {Object} Model
 * @param {Object} Reaction
 */
const ReactionsAssociation = (Model, Reaction) => {
  Model.hasMany(Reaction, {
    foreignKey: 'reactable_id',
    scope: { reactable_type: 'term' },
    as: 'reactions'
  });
};

/**
 * Defines creator relationship.
 * @param {Object} Model
 * @param {Object} Creator
 */
const CreatorAssociation = (Model, User) => {
  Model.belongsTo(User, {
    foreignKey: 'creator_id',
    as: 'creator'
  });
};

/**
 * Defines editor relationship.
 * @param {Object} Model
 * @param {Object} Editor
 */
const EditorAssociation = (Model, User) => {
  Model.belongsTo(User, {
    foreignKey: 'editor_id',
    as: 'editor'
  });
};

/**
 * Defines context relationship.
 * @param {Object} Model
 * @param {Object} Context
 */
const ContextAssociation = (Model, Context) => {
  Model.belongsTo(Context, {
    foreignKey: 'context_id',
    as: 'context'
  });
};

/**
 * Defines contributors relationship.
 * @param {Object} Model
 * @param {Object} Context
 */
const ContributorsAssociation = (Model, User) => {
  Model.belongsToMany(User, {
    as: 'contributors',
    foreignKey: 'term_id',
    otherKey: 'contributor_id',
    through: 'Contributor'
  });
};

/**
 * Term Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = Sequelize => {
  // Define model
  const Term = Sequelize.define(
    'Term',
    Props,
    {underscored: true, tableName: 'terms'}
  );

  // Define associations
  Term.associate = ({User, Context, Definition, Reaction}) => {
    // Call associations creators
    TechnicalDefinitionAssociation(Term, Definition);
    SimpleDefinitionAssociation(Term, Definition);
    ReactionsAssociation(Term, Reaction);
    CreatorAssociation(Term, User);
    EditorAssociation(Term, User);
    ContextAssociation(Term, Context);
    ContributorsAssociation(Term, User);
  };

  // return model
  return Term;
};