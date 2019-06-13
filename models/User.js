'use strict';
const { DataTypes } = require('sequelize');
const ManyToManyGenerator = require('../utils/ManyToManyGenerator');

/**
 * Model properties.
 */
const Props = {
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING
  },
  provider: {
    type: DataTypes.STRING
  } // local/github
};

/**
 * Defines roles relationship.
 * @param {Object} Model
 * @param {Object} Role
 */
const RolesAssociation = (Model, Role) => Model.belongsToMany(
  Role,
  ManyToManyGenerator('RoleUser', 'user_id', 'role_id', 'roles')
);

/**
 * Defines contexts relationship.
 * @param {Object} Model
 * @param {Object} Context
 */
const ContextsAssociation = (Model, Context) => Model.hasMany(
  Context,
  {
    as: 'contexts',
    foreignKey: 'creator_id'
  }
);

/**
 * Defines contrinutions relationship.
 * @param {Object} Model
 * @param {Object} Term
 */
const ContributionsAssociation = (Model, Term) => Model.belongsToMany(
  Term,
  ManyToManyGenerator(
    'Contributor', 'contributor_id', 'term_id', 'contributions'
  )
);

/**
 * Defines created definitions relationship.
 * @param {Object} Model
 * @param {Object} Definition
 */
const CreatedDefinitionsAssociation = (Model, Definition) => Model.hasMany(
  Definition,
  {
    as: 'createdDefinitions',
    foreignKey: 'creator_id'
  }
);

/**
 * Defines edited definitions relationship.
 * @param {Object} Model
 * @param {Object} Definition
 */
const EditedDefinitionsAssociation = (Model, Definition) => Model.hasMany(
  Definition,
  {
    as: 'editedDefinitions',
    foreignKey: 'editor_id'
  }
);

/**
 * Defines created terms relationship.
 * @param {Object} Model
 * @param {Object} Term
 */
const CreatedTermsAssociation = (Model, Term) => Model.hasMany(
  Term,
  {
    as: 'createdTerms',
    foreignKey: 'creator_id'
  }
);

/**
 * Defines edited terms relationship.
 * @param {Object} Model
 * @param {Object} Term
 */
const EditedTermsAssociation = (Model, Term) => Model.hasMany(
  Term,
  {
    as: 'editedTerms',
    foreignKey: 'editor_id'
  }
);

/**
 * Defines points relationship.
 * @param {Object} Model
 * @param {Object} Point
 */
const PointsAssociation = (Model, Point) => Model.hasMany(
  Point,
  {
    as: 'points',
    foreignKey: 'user_id'
  }
);

/**
 * Defines reactions relationship.
 * @param {Object} Model
 * @param {Object} Reaction
 */
const ReactionsAssociation = (Model, Reaction) => Model.hasMany(
  Reaction,
  {
    as: 'reactions',
    foreignKey: 'reactor_id'
  }
);

/**
 * Defines reminders relationship.
 * @param {Object} Model
 * @param {Object} Reminder
 */
const RemindersAssociation = (Model, Reminder) => Model.hasOne(
  Reminder,
  {
    as: 'reminders',
    foreignKey: 'user_id'
  }
);

/**
 * Defines activations relationship.
 * @param {Object} Model
 * @param {Object} Activation
 */
const ActivationsAssociation = (Model, Activation) => Model.hasOne(
  Activation,
  {
    as: 'activations',
    foreignKey: 'user_id'
  }
);

/**
 * Defines all model's associations.
 * @param {Object} Model
 * @param {Object} Relations
 */
const Associate = (Model, {
  Role, Context,
  Term, Definition,
  Point, Reaction,
  Reminder, Activation
}) => {
  // Call associations creators
  RolesAssociation(Model, Role);
  ContextsAssociation(Model, Context);
  ContributionsAssociation(Model, Term);
  CreatedDefinitionsAssociation(Model, Definition);
  EditedDefinitionsAssociation(Model, Definition);
  CreatedTermsAssociation(Model, Term);
  EditedTermsAssociation(Model, Term);
  PointsAssociation(Model, Point);
  ReactionsAssociation(Model, Reaction);
  RemindersAssociation(Model, Reminder);
  ActivationsAssociation(Model, Activation);
};

/**
 * User Model.
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = Sequelize => {
  const User = Sequelize.define(
    'User',
    Props,
    {underscored: true, tableName: 'users'}
  );
  
  // Create associations
  User.associate = Relations => Associate(User, Relations);

  // return model
  return User;
};