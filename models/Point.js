'use strict';
// get dependencies
const { POINT_TYPES } = require('../configs/const');

/**
 * Point Model
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Define model
  const Point = Sequelize.define('Point', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'general',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: POINT_TYPES
      },
    },
    pointable: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pointable_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
      underscored: true,
      tableName: 'points',
  });

  // Define associations
  Point.associate = ({ User, Term, Definition }) => {
    // User association
    Point.belongsTo(User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    // Term association
    Point.belongsTo(Term, {
      foreignKey: 'pointable_id',
      scope: {
        pointable_type: 'term'
      },
      as: 'terms'
    });

    // Definition association
    Point.belongsTo(Definition, {
      foreignKey: 'pointable_id',
      scope: {
        pointable_type: 'definition'
      },
      as: 'definition'
    });
  };

  // Return model
  return Point;
};