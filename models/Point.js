'use strict';
const { DataTypes } = require('sequelize');
const { POINT_TYPES } = require('../configs/const');

const Props = {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'general'
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: POINT_TYPES
    }
  },
  pointable_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pointable_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
};

/**
 * Defines owner relationship.
 * @param {Object} Model
 * @param {Object} User
 */
const OwnerAssociation = (Model, User) => {
  Model.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'owner'
  });
};

/**
 * Defines terms relationship.
 * @param {Object} Model
 * @param {Object} Term
 */
const TermsAssociation = (Model, Term) => {
  Model.belongsTo(Term, {
    foreignKey: 'pointable_id',
    scope: {
      pointable_type: 'term'
    },
    as: 'terms'
  });
};

/**
 * Defines definition relationship.
 * @param {Object} Model
 * @param {Object} Definition
 */
const DefinitionAssociation = (Model, Definition) => {
  Model.belongsTo(Definition, {
    foreignKey: 'pointable_id',
    scope: {
      pointable_type: 'definition'
    },
    as: 'definition'
  });
};

/**
 * Point Model
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = Sequelize => {
  // Define model
  const Point = Sequelize.define(
    'Point',
    Props,
    {underscored: true, tableName: 'points'}
  );

  // Define associations
  Point.associate = ({ User, Term, Definition }) => {
    // User association
    OwnerAssociation(Point, User);
    TermsAssociation(Point, Term);
    DefinitionAssociation(Point, Definition);
  };

  // Return model
  return Point;
};