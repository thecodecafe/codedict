'use strict';
const { DataTypes } = require('sequelize');

/**
 * Creates model properties
 * @param {Object} DataTypes
 * @returns Object
 */
const Props = {
  term_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contributor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subscribed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
};

/**
 * Create contributor term relationship.
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
 * Create contributor term relationship.
 * @param {Object} Model
 * @param {Object} User
 */
const ContributorAssociation = (Model, User) => Model.belongsTo(
  User,
  {
    foreignKey: 'contributor_id',
    as: 'contributor'
  }
);

/**
 * Contributor Model
 * @param {Object} Sequelize
 * @returns Object
 */
module.exports = Sequelize => {
  // Define model
  const Contributor = Sequelize.define(
    'Contributor',
    Props,
    {underscored: true, tableName: 'contributors'}
  );

  // Define associations
  Contributor.associate = ({ User, Term }) => {
    // Call relationship creators
    TermAssociation(Contributor, Term);
    ContributorAssociation(Contributor, User);
  };

  // Return model
  return Contributor;
};