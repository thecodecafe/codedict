'use strict';
const { DataTypes } = require('sequelize');

/**
 * Model properties.
 */
const Props = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  activated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  }
};

/**
 * Creates association between user and activation model.
 * @param {Object} Model
 * @param {Object} User
 */
const OwnerAssociation = (Model, User) => {
  // Owner Association
  Model.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'owner'
  });
};

/**
 * Activation Model
 * @param {Object} Sequelize
 * @returns Object
 */
module.exports = Sequelize => {
  // Define model
  const Activation = Sequelize.define(
    'Activation',
    Props,
    {underscored: true, tableName: 'activations'}
  );

  // Define association
  Activation.associate = ({ User }) => OwnerAssociation(Activation, User);

  // Return model
  return Activation;
};