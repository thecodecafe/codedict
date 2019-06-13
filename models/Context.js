'use strict';
const { DataTypes } = require('sequelize');

/**
 * Model properties
 */
const Props = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  creator_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null
  }
};

/**
 * Create context creator relationship.
 * @param {Object} Model
 * @param {Object} User
 */
const CreatorAssociation = (Model, User) => Model.belongsTo(
  User,
  {
    foreignKey: 'creator_id',
    as: 'creator',
    targetKey: 'id'
  }
);

/**
 * Create context terms relationship.
 * @param {Object} Model
 * @param {Object} Term
 */
const TermsAssociation = (Model, Term) => Model.hasMany(
  Term,
  {
    foreignKey: 'context_id',
    as: 'terms',
    targetKey: 'id'
  }
);

/**
 * Context Model
 * @param {Object} Sequelize
 * @returns Object
 */
module.exports = Sequelize => {
  // Define model
  const Context = Sequelize.define(
    'Context',
    Props,
    {underscored: true, tableName: 'contexts'}
  );

  // Define associations
  Context.associate = ({ User, Term }) => {
    // Call association creators
    CreatorAssociation(Context, User);
    TermsAssociation(Context, Term);
  };

  // Return model
  return Context;
};