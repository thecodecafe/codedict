'use strict';
/**
 * Contributor Model
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Define model
  const Contributor = Sequelize.define('Contributor', {
    term_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contributor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    underscored: true,
    tableName: 'contributors'
  });

  // Define associations
  Contributor.associate = ({ User, Term }) => {
    // Term association
    Contributor.belongsTo(Term, {
      foreignKey: 'term_id',
      as: 'term'
    });

    // Contributor association
    Contributor.belongsTo(User, {
      foreignKey: 'contributor_id',
      as: 'contributor'
    });
  }

  // Return model
  return Contributor;
};