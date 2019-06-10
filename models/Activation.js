'use strict';
/**
 * Activation Model
 * @param {Object} Sequelize
 * @param {Object} DataTypes
 * @returns Object
 */
module.exports = (Sequelize, DataTypes) => {
  // Define model
  const Activation = Sequelize.define('Activation', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    activated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
  }, {
      underscored: true,
      tableName: 'activations',
    });

  // Define association
  Activation.associate = ({ User }) => {
    // User Association
    Activation.belongsTo(User, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user'
    });
  }

  // Return model
  return Activation;
};